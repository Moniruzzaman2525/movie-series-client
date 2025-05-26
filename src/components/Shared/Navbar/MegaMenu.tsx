"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";

const MegaMenu: React.FC = () => {
    const [showMegaMenu, setShowMegaMenu] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setShowMegaMenu(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setShowMegaMenu(false);
        }, 150); // small delay to prevent flicker
    };

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <span className="cursor-pointer font-medium hover:text-red-500">
                Browse
            </span>

            <div
                className={`absolute left-0 top-full mt-2 w-[700px] bg-white text-black shadow-lg rounded-lg grid grid-cols-3 gap-6 p-6 z-50 transition-all duration-200 ${showMegaMenu ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div>
                    <h4 className="font-semibold mb-2 text-red-600">Genres</h4>
                    <ul className="space-y-1">
                        <li><Link href="/genre/action">Action</Link></li>
                        <li><Link href="/genre/comedy">Comedy</Link></li>
                        <li><Link href="/genre/drama">Drama</Link></li>
                        <li><Link href="/genre/horror">Horror</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-2 text-red-600">Top Rated</h4>
                    <ul className="space-y-1">
                        <li><Link href="/top/imdb">IMDb Top 100</Link></li>
                        <li><Link href="/top/netflix">Netflix Originals</Link></li>
                        <li><Link href="/top/classics">Classics</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-2 text-red-600">Languages</h4>
                    <ul className="space-y-1">
                        <li><Link href="/language/english">English</Link></li>
                        <li><Link href="/language/hindi">Hindi</Link></li>
                        <li><Link href="/language/korean">Korean</Link></li>
                        <li><Link href="/language/spanish">Spanish</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MegaMenu;
