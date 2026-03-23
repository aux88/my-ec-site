type Params = {
    id : string;
};

type Post = {
    id: string;
}

export default async function ProductDetail({ params }: {params: Promise<Params>}) {
    const { id } = await params;

    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        // ISRを設定するなら next: { revalidate: 60 } など
    });
    const post = await res.json();

    if (!post.id) {
        // 取得失敗時にはエラーハンドリングを行う
        // App Routerの場合は notFound() を呼んで404を返すなど
        return <div>記事が見つかりません</div>;
    }

    return (
        <div>
            <h1>ブログ記事: {post.title}</h1>
            <p>{post.body}</p>
        </div>
    );
}

// 特定のパスを事前生成したい場合に使用
export async function generateStaticParams() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await res.json();

    // 事前に生成するidをいくつか決める
    return posts.slice(0, 5).map((post: Post) => ({
        id: post.id.toString(),
    }));
}