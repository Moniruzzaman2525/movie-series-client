import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Film, Tv, Zap, Laugh, Drama, Ghost, Rocket, FileText, Compass, Smile, Eye, Heart, Star, BookOpen, Music, Shield, HardHat, Users, User, Dribbble, Music2, ShieldCheck, Brain, LifeBuoy, Frown, Landmark, SmilePlus } from "lucide-react"
import { countingMovieSeries } from "@/service/Content"

const categories = [
    {
        id: 1,
        name: "Action",
        image: "https://img.freepik.com/free-photo/front-view-soldier-wearing-camouflage-equipment_23-2151001978.jpg?ga=GA1.1.1201157154.1748281343&semt=ais_items_boosted&w=740",
        icon: Zap,
        color: "from-red-500 to-orange-500",
    },
    {
        id: 2,
        name: "Adventure",
        image: "https://img.freepik.com/free-photo/traveling-with-off-road-car_23-2151472953.jpg?ga=GA1.1.1201157154.1748281343&semt=ais_items_boosted&w=740",
        icon: Compass,
        color: "from-yellow-600 to-green-500",
    },
    {
        id: 3,
        name: "Animation",
        image: "https://img.freepik.com/free-photo/view-3d-young-children-watching-movie_23-2151066971.jpg?ga=GA1.1.1201157154.1748281343&semt=ais_items_boosted&w=740",
        icon: Smile,
        color: "from-pink-500 to-purple-500",
    },
    {
        id: 4,
        name: "Comedy",
        image: "https://img.freepik.com/free-photo/couple-watching-interesting-film-together_23-2147803792.jpg?ga=GA1.1.1201157154.1748281343&semt=ais_items_boosted&w=740",
        icon: Laugh,
        color: "from-yellow-500 to-orange-500",
    },
    {
        id: 5,
        name: "Drama",
        image: "https://img.freepik.com/free-photo/young-couple-watching-movie-cinema_23-2148202042.jpg?ga=GA1.1.1201157154.1748281343&semt=ais_items_boosted&w=740",
        icon: Drama,
        color: "from-blue-500 to-purple-500",
    },
    {
        id: 6,
        name: "Horror",
        image: "https://img.freepik.com/free-photo/dark-fantasy-scene_23-2151136237.jpg?ga=GA1.1.1201157154.1748281343&semt=ais_items_boosted&w=740",
        icon: Ghost,
        color: "from-purple-500 to-red-500",
    },
    {
        id: 7,
        name: "Mystery",
        image: "https://img.freepik.com/free-photo/full-shot-man-outdoors-nighttime_23-2151103628.jpg?ga=GA1.1.1201157154.1748281343&semt=ais_items_boosted&w=740",
        icon: Eye,
        color: "from-gray-700 to-indigo-700",
    },
    {
        id: 8,
        name: "Romance",
        image: "https://img.freepik.com/free-photo/couple-cinema_23-2147988981.jpg?ga=GA1.1.1201157154.1748281343&semt=ais_items_boosted&w=740",
        icon: Heart,
        color: "from-rose-400 to-pink-500",
    },
    {
        id: 9,
        name: "Science Fiction",
        image: "https://img.freepik.com/free-photo/hugging-day-celebration_23-2150976856.jpg?ga=GA1.1.1201157154.1748281343&semt=ais_items_boosted&w=740",
        icon: Rocket,
        color: "from-cyan-500 to-blue-500",
    },
    {
        id: 10,
        name: "Thriller",
        image: "https://img.freepik.com/free-photo/dark-fantasy-scene_23-2151136106.jpg?ga=GA1.1.1201157154.1748281343&semt=ais_items_boosted&w=740",
        icon: Film,
        color: "from-indigo-500 to-purple-500",
    },
    {
        id: 11,
        name: "Fantasy",
        image: "https://img.freepik.com/free-photo/full-shot-ninja-wearing-equipment_23-2150960979.jpg?ga=GA1.1.1201157154.1748281343&semt=ais_items_boosted&w=740",
        icon: Star,
        color: "from-fuchsia-500 to-violet-500",
    },
    {
        id: 12,
        name: "Documentary",
        image: "https://img.freepik.com/free-photo/virtual-reality-headset-popcorn_23-2148912759.jpg?ga=GA1.1.1201157154.1748281343&semt=ais_items_boosted&w=740",
        icon: FileText,
        color: "from-green-500 to-teal-500",
    },
    {
        id: 13,
        name: "Crime",
        image: "https://img.freepik.com/premium-photo/black-clapperboard-with-gun-background-directing-filming-cinema-movie-detective-criminal-story_370059-2838.jpg?ga=GA1.1.1201157154.1748281343&semt=ais_items_boosted&w=740",
        icon: Tv,
        color: "from-pink-500 to-rose-500",
    },
    {
        id: 14,
        name: "Historical",
        image: "https://img.freepik.com/free-photo/retro-world-theatre-day-scenes-with-people-preparing-scenary_23-2151211412.jpg?ga=GA1.1.1201157154.1748281343&semt=ais_items_boosted&w=740",
        icon: BookOpen,
        color: "from-yellow-800 to-amber-700",
    },
    {
        id: 15,
        name: "Music",
        image: "https://img.freepik.com/free-photo/group-diverse-friends-music-concept_53876-71068.jpg?ga=GA1.1.1201157154.1748281343&semt=ais_items_boosted&w=740",
        icon: Music,
        color: "from-pink-400 to-purple-600",
    },
    {
        id: 16,
        name: "War",
        image: "https://img.freepik.com/free-photo/front-view-soldier-wearing-camouflage-equipment_23-2151001978.jpg?ga=GA1.1.1201157154.1748281343&semt=ais_items_boosted&w=740",
        icon: Shield,
        color: "from-gray-800 to-red-700",
    },
    {
        id: 17,
        name: "Western",
        image: "https://img.freepik.com/free-vector/vitage-wild-west-wanted-poster-with-old-paper-texture-backgroung_1284-38832.jpg?ga=GA1.1.1201157154.1748281343&semt=ais_items_boosted&w=740",
        icon: HardHat,
        color: "from-yellow-700 to-orange-700",
    },
    {
        id: 18,
        name: "Family",
        image: "https://img.freepik.com/free-vector/family-watching-movie-their-sofa_52683-39278.jpg?ga=GA1.1.1201157154.1748281343&semt=ais_items_boosted&w=740",
        icon: Users,
        color: "from-green-400 to-lime-500",
    },
    {
        id: 19,
        name: "Biography",
        image: "https://img.freepik.com/free-photo/girl-winking-showing-clapperboard_1149-1058.jpg?ga=GA1.1.1201157154.1748281343&semt=ais_items_boosted&w=740",
        icon: User,
        color: "from-blue-400 to-cyan-400",
    },
    {
        id: 20,
        name: "Sport",
        image: "https://img.freepik.com/free-photo/smiling-young-couple-sitting-sofa-watching-soccer-game_23-2148152782.jpg?ga=GA1.1.1201157154.1748281343&semt=ais_items_boosted&w=740",
        icon: Dribbble,
        color: "from-emerald-500 to-green-600",
    },
    {
        id: 21,
        name: "Musical",
        image: "https://img.freepik.com/free-photo/love-education-young-student-couple-reading-together-room-decorated-with-voluminous-letters-with-illumination_613910-21260.jpg?ga=GA1.1.1201157154.1748281343&semt=ais_items_boosted&w=740",
        icon: Music2,
        color: "from-indigo-400 to-purple-600",
    },
    {
        id: 22,
        name: "Superhero",
        image: "https://img.freepik.com/premium-photo/young-woman-with-short-dark-hair-stands-rooftop-wearing-red-cape-black-leather-outfit-city-is-ruins-her_14117-421918.jpg?ga=GA1.1.1201157154.1748281343&semt=ais_items_boosted&w=740",
        icon: ShieldCheck,
        color: "from-red-600 to-yellow-400",
    },
    {
        id: 23,
        name: "Psychological",
        image: "https://img.freepik.com/free-photo/woman-watching-movie-cinema_23-2148202075.jpg?ga=GA1.1.1201157154.1748281343&semt=ais_items_boosted&w=740",
        icon: Brain,
        color: "from-gray-600 to-blue-700",
    },
    {
        id: 24,
        name: "Slice of Life",
        image: "https://img.freepik.com/free-photo/high-angle-smart-speaker-home_23-2150171768.jpg?ga=GA1.1.1201157154.1748281343&semt=ais_items_boosted&w=740",
        icon: LifeBuoy,
        color: "from-orange-400 to-yellow-300",
    },
    {
        id: 25,
        name: "Tragedy",
        image: "https://img.freepik.com/free-photo/retro-world-theatre-day-scenes_23-2151211445.jpg?ga=GA1.1.1201157154.1748281343&semt=ais_items_boosted&w=740",
        icon: Frown,
        color: "from-gray-400 to-black",
    },
    {
        id: 26,
        name: "Political",
        image: "https://img.freepik.com/free-vector/tv-live-political-debates-show-with-campaign-participants-presenting-programs-confronting-opponents-cartoon-composition_1284-27809.jpg?ga=GA1.1.1201157154.1748281343&semt=ais_items_boosted&w=740",
        icon: Landmark,
        color: "from-blue-800 to-indigo-800",
    },
    {
        id: 27,
        name: "Satire",
        image: "https://img.freepik.com/free-photo/man-mask-posing-with-popcorn_23-2147685503.jpg?ga=GA1.1.1201157154.1748281343&semt=ais_items_boosted&w=740",
        icon: SmilePlus,
        color: "from-yellow-300 to-pink-300",
    },
]

export async function CategorySection({ count }: { count: number }) {

    const result = await countingMovieSeries()
    return (
        <section className="py-20 bg-[#020508]">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">Browse Genera</h2>
                        <p className="text-gray-400 text-lg">Discover content tailored to your taste</p>
                    </div>
                    <div className="z-[99]">
                        {count <= 8 && <Link
                            href="/categories"
                            className="hidden md:flex items-center text-blue-400 hover:text-blue-300 transition-colors group"
                        >
                            <span className="mr-2">View All Genera</span>
                            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Link>}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.slice(0, count).map((category) => {
                        const IconComponent = category.icon
                        return (
                            <Link key={category.id} href={`/movies?category=${category.name}`} className="group">
                                <div className="relative overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">

                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={category.image || "/placeholder.svg"}
                                            alt={category.name}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

                                        <div
                                            className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                                        />
                                    </div>

                                    <div className="relative p-6">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} shadow-lg`}>
                                                <IconComponent className="w-6 h-6 text-white" />
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                            {category.name}
                                        </h3>

                                        <div className="flex items-center text-gray-400 text-sm">
                                            <span>Explore now</span>
                                            <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>

                                    <div
                                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl`}
                                    />
                                </div>
                            </Link>
                        )
                    })}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link
                        href="/categories"
                        className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        <span className="mr-2">View All Categories</span>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-1">{result?.movie}+</div>
                        <div className="text-gray-400 text-sm">Total Movies</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-1">{result?.series}+</div>
                        <div className="text-gray-400 text-sm">Web Series</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-1">27+</div>
                        <div className="text-gray-400 text-sm">Genres</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-white mb-1">4K</div>
                        <div className="text-gray-400 text-sm">Ultra HD</div>
                    </div>
                </div>
            </div>
        </section>
    )
}
