import Link from 'next/link';
import Balancer from 'react-wrap-balancer';

import { formatDate, placeholderBlurhash } from '#/lib/utils';
import BlurImage from '#/components/write/blur-image';

interface Post {
  _id: string;
  title: string;
  description: string;
  date: string;
  slug: string;
  image: string;
}

interface BlogPostsProps {
  posts: Post[];
}

export function BlogPosts({ posts }: BlogPostsProps) {
  return (
    <div className="container space-y-10 py-6 md:py-10 lg:py-20">
      <section>
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-primary">
          Just Dropped
        </h2>
        <article className="relative grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            {posts[0].image && (
              <BlurImage
                alt={posts[0].title}
                className="w-full rounded-lg border object-cover object-center md:h-64 lg:h-96"
                height={452}
                src={posts[0].image}
                width={804}
                placeholder="blur"
                blurDataURL={placeholderBlurhash}
                role="img"
              />
            )}
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="mb-2 text-2xl font-bold md:text-4xl lg:text-6xl">
              <Balancer>{posts[0].title}</Balancer>
            </h3>
            {posts[0].description && (
              <p className="text-muted-foreground md:text-lg">
                <Balancer>{posts[0].description}</Balancer>
              </p>
            )}
            <Link href={posts[0].slug} className="absolute inset-0">
              <span className="sr-only">View Article</span>
            </Link>
          </div>
        </article>
      </section>

      <section>
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-primary">
          Popular Posts
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(1).map((post) => (
            <article
              key={post._id}
              className="group relative flex flex-col space-y-2"
            >
              {post.image && (
                <BlurImage
                  alt={post.title}
                  src={post.image}
                  width={804}
                  height={452}
                  className="rounded-md border bg-muted transition-colors"
                  placeholder="blur"
                  blurDataURL={placeholderBlurhash}
                  role="img"
                />
              )}
              <h2 className="text-2xl font-bold">{post.title}</h2>
              {post.description && (
                <p className="text-muted-foreground">{post.description}</p>
              )}
              {post.date && (
                <p className="text-sm text-primary">{formatDate(post.date)}</p>
              )}
              <Link href={post.slug} className="absolute inset-0">
                <span className="sr-only">View Article</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
