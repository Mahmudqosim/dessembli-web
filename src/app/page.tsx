import { cookieBasedClient } from "@/utils/amplify-utils";

export default async function Home() {
  const { data: posts, errors } = await cookieBasedClient.models.Post.list({ authMode: 'apiKey' })

  console.log('Data', posts)
  console.log('Error', errors)

  return (
    <div className="p-12">
      <h1 className="text-xl font-bold tracking-tight">Trending Projects</h1>

      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
