export const demoData = {
    stats: {
        totalReviews: 2543,
        averageRating: 4.2,
        titlesReviewed: 342,
        activeReviewers: 573,
    },
    titles: [
        { id: 1, title: "The Last Journey", category: "Adventure", reviewCount: 342, averageRating: 4.7 },
        { id: 2, title: "Midnight Chronicles", category: "Fantasy", reviewCount: 289, averageRating: 4.5 },
        { id: 3, title: "City of Dreams", category: "Sci-Fi", reviewCount: 256, averageRating: 4.2 },
        { id: 4, title: "The Silent Echo", category: "Mystery", reviewCount: 231, averageRating: 4.6 },
        { id: 5, title: "Beyond the Horizon", category: "Adventure", reviewCount: 198, averageRating: 4.3 },
        { id: 6, title: "Eternal Shadows", category: "Horror", reviewCount: 187, averageRating: 3.9 },
        { id: 7, title: "Whispers in the Dark", category: "Thriller", reviewCount: 176, averageRating: 4.1 },
        { id: 8, title: "The Lost Key", category: "Mystery", reviewCount: 165, averageRating: 4.4 },
        { id: 9, title: "Dragon's Lair", category: "Fantasy", reviewCount: 154, averageRating: 4.8 },
        { id: 10, title: "Quantum Paradox", category: "Sci-Fi", reviewCount: 143, averageRating: 4.0 },
        { id: 11, title: "Mountain's Echo", category: "Adventure", reviewCount: 132, averageRating: 4.2 },
        { id: 12, title: "Crimson Tide", category: "Thriller", reviewCount: 121, averageRating: 3.7 },
    ],
    ratingSummary: [
        { rating: 5, count: 1245, percentage: 49 },
        { rating: 4, count: 876, percentage: 34 },
        { rating: 3, count: 321, percentage: 13 },
        { rating: 2, count: 76, percentage: 3 },
        { rating: 1, count: 25, percentage: 1 },
    ],
    reviews: [
        {
            id: 1,
            title: "The Last Journey",
            user: { name: "Alex Johnson", avatar: "/placeholder.svg?height=40&width=40" },
            rating: 5,
            comment:
                "Absolutely loved this! The character development was outstanding and the plot kept me engaged throughout.",
            date: "2 hours ago",
        },
        {
            id: 2,
            title: "City of Dreams",
            user: { name: "Sarah Miller", avatar: "/placeholder.svg?height=40&width=40" },
            rating: 4,
            comment: "Great world-building and interesting concepts. The ending felt a bit rushed though.",
            date: "5 hours ago",
        },
        {
            id: 3,
            title: "Midnight Chronicles",
            user: { name: "James Wilson", avatar: "/placeholder.svg?height=40&width=40" },
            rating: 5,
            comment: "One of the best fantasy novels I've read this year. Can't wait for the sequel!",
            date: "Yesterday",
        },
        {
            id: 4,
            title: "The Silent Echo",
            user: { name: "Emma Davis", avatar: "/placeholder.svg?height=40&width=40" },
            rating: 3,
            comment: "Interesting premise but the middle section dragged on too long. The ending was satisfying though.",
            date: "2 days ago",
        },
        {
            id: 5,
            title: "Beyond the Horizon",
            user: { name: "Michael Brown", avatar: "/placeholder.svg?height=40&width=40" },
            rating: 4,
            comment: "A great adventure story with memorable characters. Highly recommended!",
            date: "3 days ago",
        },
        {
            id: 6,
            title: "Eternal Shadows",
            user: { name: "Lisa Taylor", avatar: "/placeholder.svg?height=40&width=40" },
            rating: 2,
            comment: "Too scary for me. The atmosphere was well-crafted but I couldn't finish it.",
            date: "4 days ago",
        },
        {
            id: 7,
            title: "Dragon's Lair",
            user: { name: "David Wilson", avatar: "/placeholder.svg?height=40&width=40" },
            rating: 5,
            comment: "Best fantasy book I've read in years! The dragon scenes were incredibly well written.",
            date: "5 days ago",
        },
    ],
}
