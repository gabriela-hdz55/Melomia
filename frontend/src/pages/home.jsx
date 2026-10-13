import Search from "../features/search/Search";

export default function Home() {
    return (
        <div>
            <h1 className="text-4xl font-bold text-center mt-8">Welcome to the Lyric Game!</h1>
            <p className="text-center mt-4 text-lg">Test your knowledge of song lyrics and have fun!</p>
            <Search />
        </div>
    );
}