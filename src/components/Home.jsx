import { Link } from "react-router-dom";

export default function Home() {
    return (
        <section class="bg-gray-800 text-white h-screen flex items-center">
        <div class="container mx-auto text-center">
            <h1 class="text-4xl font-bold mb-4">Welcome to RandomPosts</h1>
                <p class="text-lg mb-8">Discover insightful articles/posts from our passionate writers.</p>
                <Link to='/AllArticles'>
            <a  class="bg-blue-500 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-600">
                Explore Now
                <i class="fas fa-arrow-right ml-2"></i>
            </a>
                </Link>
        </div>
    </section>  
    );
}