"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import styles from "./ProductImageCarousel.module.css";

type Props = {
    images: string[];
    title: string;
};

export const ProductImageCarousel = ({ images, title }: Props) => {
    const safeImages = useMemo(() => {
        if (!images || images.length === 0) return [];
        return images;
    }, [images]);

    const [activeIndex, setActiveIndex] = useState(0);
    const canNavigate = safeImages.length > 1;
    const currentIndex = safeImages.length > 0 ? activeIndex % safeImages.length : 0;

    const goPrev = () => {
        if (!canNavigate) return;
        setActiveIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length);
    };

    const goNext = () => {
        if (!canNavigate) return;
        setActiveIndex((prev) => (prev + 1) % safeImages.length);
    };

    if (safeImages.length === 0) return null;

    return (
        <figure className={styles.imageWrapper}>
            <Image
                src={safeImages[currentIndex]}
                alt={title}
                fill
                style={{ objectFit: "cover" }}
                priority
            />

            {canNavigate && (
                <>
                    <button
                        type="button"
                        className={`${styles.carouselBtn} ${styles.prevBtn}`}
                        onClick={goPrev}
                        aria-label="前の画像を表示"
                    >
                        ‹
                    </button>
                    <button
                        type="button"
                        className={`${styles.carouselBtn} ${styles.nextBtn}`}
                        onClick={goNext}
                        aria-label="次の画像を表示"
                    >
                        ›
                    </button>

                    <div className={styles.dots} aria-label="画像切り替え">
                        {safeImages.map((_, idx) => (
                            <button
                                key={idx}
                                type="button"
                                className={`${styles.dot} ${idx === currentIndex ? styles.dotActive : ""}`}
                                onClick={() => setActiveIndex(idx)}
                                aria-label={`画像 ${idx + 1} を表示`}
                                aria-current={idx === currentIndex}
                            />
                        ))}
                    </div>
                </>
            )}
        </figure>
    );
};

