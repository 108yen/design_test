import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import React, { useEffect, useRef } from 'react';
gsap.registerPlugin(ScrollTrigger);

export default function GsapStyled() {
    const pagesWrapperRef = useRef<HTMLDivElement | null>(null);
    const pagesRef = useRef<HTMLDivElement | null>(null);
    const didEffect = React.useRef(false);

    useEffect(() => {
        if (didEffect.current) return
        didEffect.current = true;
        const pagesElement = pagesRef?.current;
        if (!pagesElement) return
        const pagesWrapperElement = pagesWrapperRef?.current;
        if (!pagesWrapperElement) return
        setupGsap(pagesElement, pagesWrapperElement)
    }, [])

    const setupGsap = (pagesElement: HTMLDivElement, pagesWrapperElement: HTMLDivElement) => {
        gsap.to(pagesElement, {
            x: () => -(pagesElement.clientWidth - pagesWrapperElement.clientWidth),
            ease: 'none',
            scrollTrigger: {
                trigger: '#horizontal-scroll-section',
                start: 'top top',
                end: () => `+=${pagesElement.clientWidth - pagesWrapperElement.clientWidth}`,
                scrub: true,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            },
        })
    }

    return (
        <>
        </>
    );
}