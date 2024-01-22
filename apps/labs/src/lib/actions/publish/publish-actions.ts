'use server';

import { env } from '#/env';

import type { Post, Site } from '@prisma/client';

import { revalidateTag } from 'next/cache';
import { put } from '@vercel/blob';
import { customAlphabet } from 'nanoid';
import slugify from 'slugify';

import {
  addDomainToVercel,
  // getApexDomain,
  removeDomainFromVercelProject,
  // removeDomainFromVercelTeam,
  validDomainRegex,
} from '#/lib/actions/publish/domains';
import { isAdmin } from '#/lib/admin';
import { withPostAuth, withSiteAuth } from '#/lib/auth';
import { db } from '#/lib/db';
import { getTeam } from '#/lib/operations/teams/get-current-team';
import { getSession } from '#/lib/operations/user/session';
import { getBlurDataURL } from '#/lib/utils';

const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7,
);

export const createSite = async (formData: FormData) => {
  const session = await getSession();
  const teamSlug = formData.get('teamSlug') as string;
  const team = await getTeam(teamSlug);
  if (!team || !session?.user.id) {
    return {
      error: 'Not authenticated',
    };
  }

  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const subdomain = formData.get('subdomain') as string;

  const reservedDomains = env.RESERVED_DOMAINS?.split(',') || [];

  if (
    !isAdmin(session.user.id) &&
    reservedDomains.includes(subdomain.toLowerCase())
  ) {
    return {
      error:
        "Oh no, this is a reserved subdomain and can't be used. Please try another one.",
    };
  }

  try {
    const response = await db.site.create({
      data: {
        name,
        description,
        subdomain,
        team: {
          connect: {
            id: team.id,
          },
        },
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
    await revalidateTag(`${subdomain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`);
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.code === 'P2002') {
      return {
        error: 'This subdomain is already taken',
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
};

export const updateSite = withSiteAuth(
  async (formData: FormData, site: Site, key: string) => {
    const value = formData.get(key) as string;

    try {
      let response;

      if (key === 'customDomain') {
        if (value.includes('vercel.pub')) {
          return {
            error: 'Cannot use vercel.pub subdomain as your custom domain',
          };

          // if the custom domain is valid, we need to add it to Vercel
        } else if (validDomainRegex.test(value)) {
          response = await db.site.update({
            where: {
              id: site.id,
            },
            data: {
              customDomain: value,
            },
          });
          await Promise.all([
            addDomainToVercel(value),
            // Optional: add www subdomain as well and redirect to apex domain
            // addDomainToVercel(`www.${value}`),
          ]);

          // empty value means the user wants to remove the custom domain
        } else if (value === '') {
          response = await db.site.update({
            where: {
              id: site.id,
            },
            data: {
              customDomain: null,
            },
          });
        }

        // if the site had a different customDomain before, we need to remove it from Vercel
        if (site.customDomain && site.customDomain !== value) {
          response = await removeDomainFromVercelProject(site.customDomain);

          /* Optional: remove domain from Vercel team 

          // first, we need to check if the apex domain is being used by other sites
          const apexDomain = getApexDomain(`https://${site.customDomain}`);
          const domainCount = await db.site.count({
            where: {
              OR: [
                {
                  customDomain: apexDomain,
                },
                {
                  customDomain: {
                    endsWith: `.${apexDomain}`,
                  },
                },
              ],
            },
          });

          // if the apex domain is being used by other sites
          // we should only remove it from our Vercel project
          if (domainCount >= 1) {
            await removeDomainFromVercelProject(site.customDomain);
          } else {
            // this is the only site using this apex domain
            // so we can remove it entirely from our Vercel team
            await removeDomainFromVercelTeam(
              site.customDomain
            );
          }
          
          */
        }
      } else if (key === 'image' || key === 'logo') {
        if (!env.BLOB_READ_WRITE_TOKEN) {
          return {
            error:
              'Missing BLOB_READ_WRITE_TOKEN token. Note: Vercel Blob is currently in beta – please fill out this form for access: https://tally.so/r/nPDMNd',
          };
        }

        const file = formData.get(key) as File;
        const filename = `${nanoid()}.${file.type.split('/')[1]}`;

        const { url } = await put(filename, file, {
          access: 'public',
        });

        const blurhash = key === 'image' ? await getBlurDataURL(url) : null;

        response = await db.site.update({
          where: {
            id: site.id,
          },
          data: {
            [key]: url,
            ...(blurhash && { imageBlurhash: blurhash }),
          },
        });
      } else {
        response = await db.site.update({
          where: {
            id: site.id,
          },
          data: {
            [key]: value,
          },
        });
      }
      {
        /*console.log(
        'Updated site data! Revalidating tags: ',
        `${site.subdomain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
        `${site.customDomain}-metadata`,
      );*/
      }
      await revalidateTag(
        `${site.subdomain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
      );
      site.customDomain &&
        (await revalidateTag(`${site.customDomain}-metadata`));

      return response;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.code === 'P2002') {
        return {
          error: `This ${key} is already taken`,
        };
      } else {
        return {
          error: error.message,
        };
      }
    }
  },
);

export const deleteSite = withSiteAuth(async (_: FormData, site: Site) => {
  const session = await getSession();

  if (!session?.user.id || !site.teamId) {
    return {
      error: 'Not authenticated',
    };
  }

  const membership = await db.membership.findUnique({
    where: {
      userId_teamId: {
        userId: session.user.id,
        teamId: site.teamId,
      },
    },
  });

  if (!membership || !['OWNER', 'ADMIN'].includes(membership.role)) {
    return {
      error:
        'Whoops, for now, you need to be an admin to delete a site. Thank you for your patience.',
    };
  }
  try {
    const response = await db.site.delete({
      where: {
        id: site.id,
      },
    });
    await revalidateTag(
      `${site.subdomain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
    );
    response.customDomain &&
      (await revalidateTag(`${site.customDomain}-metadata`));
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
});

export const getSiteFromPostId = async (postId: string) => {
  const post = await db.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      siteId: true,
    },
  });
  return post?.siteId;
};

export const createCollabPost = withSiteAuth(
  // eslint-disable-next-line camelcase
  async (formData: FormData, site: Site, team_slug: string) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: 'Not authenticated',
      };
    }

    const team = await getTeam(team_slug);
    if (!team) {
      return {
        error: 'Not authenticated',
      };
    }

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const slug = slugify(title, {
      lower: true,
      strict: true,
    });

    const response = await db.post.create({
      data: {
        siteId: site.id,
        teamId: team.id,
        userId: session.user.id,
        title: title,
        description: description,
        slug: slug,
      },
    });

    await revalidateTag(
      `${site.subdomain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`,
    );
    site.customDomain && (await revalidateTag(`${site.customDomain}-posts`));

    return response;
  },
);

interface PublishPostResponse {
  data?: Post;
  error?: string;
}

export const publishPost = async (
  formData: FormData,
  post: Post & { site: Site },
): Promise<PublishPostResponse> => {
  try {
    let imageUrl, blurhash;
    if (formData.has('image')) {
      const imageFile = formData.get('image') as File;
      const filename = `${nanoid()}.${imageFile.type.split('/')[1]}`;

      const uploadResult = await put(filename, imageFile, {
        access: 'public',
      });
      imageUrl = uploadResult.url;
      blurhash = await getBlurDataURL(imageUrl);
    }

    const response = await db.post.update({
      where: {
        id: post.id,
      },
      data: {
        title: formData.get('title') as string,
        slug: formData.get('slug') as string,
        userId: formData.get('author') as string,
        description: formData.get('description') as string,
        content: formData.get('content') as string,
        image: imageUrl || post.image,
        imageBlurhash: blurhash || post.imageBlurhash,
        published: true,
      },
    });

    const revalidatePostTags = async (
      site: Site,
      slug: string,
      postId: string,
    ) => {
      await revalidateTag(
        `${site.subdomain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`,
      );
      await revalidateTag(
        `${post.site?.subdomain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
      );
      await revalidateTag(
        `${site.subdomain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}-${slug}`,
      );
      await revalidateTag(
        `${site.subdomain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}-post-${postId}`,
      );

      if (site.customDomain) {
        await revalidateTag(`${site.customDomain}-posts`);
        await revalidateTag(`${site.customDomain}-${slug}`);
        await revalidateTag(`${site.customDomain}-post-${postId}`);
      }
    };

    await revalidatePostTags(
      post.site,
      formData.get('slug') as string,
      post.id,
    );

    return { data: response };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { error: 'This slug is already in use' };
    } else {
      return { error: error.message };
    }
  }
};

interface UpdateCollabPostResponse {
  data?: Post;
  error?: string;
}

export const updateCollabPost = async (
  formData: FormData,
  post: Post & { site: Site },
): Promise<UpdateCollabPostResponse> => {
  try {
    let imageUrl, blurhash;
    if (formData.has('image')) {
      const imageFile = formData.get('image') as File;
      const filename = `${nanoid()}.${imageFile.type.split('/')[1]}`;

      const uploadResult = await put(filename, imageFile, {
        access: 'public',
      });
      imageUrl = uploadResult.url;
      blurhash = await getBlurDataURL(imageUrl);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: Record<string, any> = {};
    formData.forEach((value, key) => {
      if (key === 'author') {
        updateData.userId = value;
      } else if (key === 'published') {
        updateData.published = value === 'true';
      } else {
        updateData[key] = value;
      }
    });

    if (imageUrl) {
      updateData.image = imageUrl;
      updateData.imageBlurhash = blurhash;
    }

    const response = await db.post.update({
      where: {
        id: post.id,
      },
      data: {
        ...updateData,
      },
    });

    const revalidatePostTags = async (site: Site, slug: string) => {
      await revalidateTag(
        `${site.subdomain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`,
      );
      await revalidateTag(
        `${site.subdomain}.${env.NEXT_PUBLIC_ROOT_DOMAIN}-${slug}`,
      );

      if (site.customDomain) {
        await revalidateTag(`${site.customDomain}-posts`);
        await revalidateTag(`${site.customDomain}-${slug}`);
      }
    };

    await revalidatePostTags(post.site, formData.get('slug') as string);

    return { data: response };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { error: 'This slug is already in use' };
    } else {
      return { error: error.message };
    }
  }
};

export const deletePost = withPostAuth(async (_: FormData, post: Post) => {
  const session = await getSession();

  if (!session?.user.id || !post.teamId) {
    return {
      error: 'Not authenticated',
    };
  }

  const isAuthor = session.user.id === post.userId;
  const membership = await db.membership.findFirst({
    where: {
      userId: session.user.id,
      teamId: post.teamId,
    },
  });
  const hasRequiredRole =
    membership && ['OWNER', 'ADMIN'].includes(membership.role);

  if (!isAuthor && !hasRequiredRole) {
    return {
      error:
        "You didn't create this post or are not the assigned author. Please ask an Admin to delete it. Thank you.",
    };
  }
  try {
    const response = await db.post.delete({
      where: {
        id: post.id,
      },
      select: {
        siteId: true,
      },
    });

    if (!env.TIPTAP_COLLAB_API_SECRET) {
      throw new Error('TIPTAP_COLLAB_API_SECRET is not defined');
    }

    const requestUrl = `https://${env.NEXT_PUBLIC_TIPTAP_COLLAB_APP_ID}.collab.tiptap.cloud/api/documents/${env.NEXT_PUBLIC_COLLAB_DOC_PREFIX}${post.id}`;

    const tiptapResponse = await fetch(requestUrl, {
      method: 'DELETE',
      headers: {
        Authorization: env.TIPTAP_COLLAB_API_SECRET,
      },
    });

    if (!tiptapResponse.ok) {
      throw new Error('Failed to delete the document from Tiptap Cloud');
    }

    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
});
