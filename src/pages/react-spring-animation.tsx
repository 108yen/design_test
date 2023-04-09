import { useSpring, animated } from '@react-spring/web'
import { useLayoutEffect, useState } from 'react';
import { useChain, useSpringRef, useTransition } from 'react-spring'

const data = ['鉄血', '熱血', '冷血']

function UseTransitionComponent() {
    const [activeIndex, setActiveIndex] = useState(0);
    const springApi = useSpringRef();

    const transitions = useTransition(activeIndex, {
        from: {
            opacity: 0,
            transform: "translateY(-100%)",
        },
        enter: {
            opacity: 1,
            transform: "translateY(0)",
        },
        leave: { opacity: 1 },
        update: { opacity: 1 },
        onRest: (_springs, _ctrl, item) => {
            if (activeIndex === item) {
                setActiveIndex(activeIndex === data.length - 1 ? 0 : activeIndex + 1)
            }
        },
        exitBeforeEnter: true,
        config: {
            duration: 100,
        },
        delay: 1000,
        ref: springApi,
    });

    useLayoutEffect(() => {
        springApi.start()
    }, [activeIndex]);

    return (
        <>
            {transitions((style, item) => (
                <animated.div
                    style={{
                        ...style,
                    }}>
                    {data[item]}
                </animated.div>
            ))}
            にして
        </>
    );
}

function UseChainComponent() {
    const springRef = useSpringRef()
    const springs = useSpring({
        ref: springRef,
        from: { size: '20%' },
        to: { size: '50%' },
    })

    const transRef = useSpringRef()
    const transitions = useTransition(data, {
        ref: transRef,
        exitBeforeEnter: true,
        config: {
            duration: 4000,
        },
        delay: 1000,
        from: { scale: 0 },
        enter: { scale: 1 },
        leave: { scale: 0, display: "none", },
    })

    useChain([springRef, transRef], [0, 0.4])

    return (
        <animated.div
            style={{
                height: springs.size,
                width: springs.size,
                background: 'blue',
            }}>
            {transitions((style, item) => (
                <animated.div
                    style={{
                        width: '120px',
                        height: '120px',
                        background: 'green',
                        ...style,
                    }}>
                    {item}
                </animated.div>
            ))}
        </animated.div>
    )
}

function UseSpringComponent() {
    const props = useSpring({
        config: {
            duration: 100,
        },
        loop: true,
        delay: 3000,
        from: {
            opacity: 0,
            transform: "translateY(-100%)",
        },
        to: {
            opacity: 1,
            transform: "translateY(0)",
        },
    })

    return <animated.div style={props}>Hello World</animated.div>
}

export default function SpringAnimation() {
    return (
        <>
            {/* <UseSpringComponent /> */}
            {/* <UseChainComponent /> */}
            <UseTransitionComponent />
        </>
    );
}