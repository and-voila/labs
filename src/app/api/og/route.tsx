import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { ipAddress } from '@vercel/edge';

import { ratelimit } from '#/lib/upstash';
import { ogImageSchema } from '#/lib/validations/og';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const ip = ipAddress(request) || 'anonymous';
  const { success } = await ratelimit(5, '1 m').limit(ip);
  if (!success) {
    return new Response('Too many requests 🤨. Try again later.', {
      status: 429,
    });
  }

  const bricolageBold = fetch(
    new URL('../../../../public/fonts/bricolage-bold.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer());

  try {
    const { searchParams } = new URL(request.url);

    let titleParam =
      searchParams.get('title') || 'Delightfully good digital marketing';

    // console.log('Received title:', titleParam);

    const validationResult = ogImageSchema.safeParse({ title: titleParam });

    if (!validationResult.success) {
      titleParam = 'Delightfully good digital marketing';
    }

    const title = titleParam.slice(0, 100);

    return new ImageResponse(
      (
        <div
          style={{
            backgroundImage:
              'url(https://utfs.io/f/12401cdf-dfd8-4983-b1ff-58205581732f-1qvxay.jpg)',
            backgroundSize: '100% 100%',
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Bricolage Grotesque',
            padding: '40px 80px',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '69%',
              left: '55%',
              transform: 'translate(-50%, -50%)',
              width: '325px',
              height: '300px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                fontSize: '30px',
                fontWeight: '700',
                color: 'white',
                textAlign: 'center',
                wordWrap: 'break-word',
              }}
            >
              {title}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Bricolage Grotesque',
            data: await bricolageBold,
            style: 'normal',
            weight: 800,
          },
        ],
      },
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    // console.log(`${e.message}`);
    return new Response('Oops, image could not be generated.', {
      status: 500,
    });
  }
}
