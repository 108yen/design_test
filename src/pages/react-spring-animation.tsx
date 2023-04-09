import { useSpring, animated } from '@react-spring/web'
import { Children, ReactNode, useLayoutEffect, useState } from 'react';
import { easings, useChain, useSpringRef, useTransition } from 'react-spring'

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

function UseSpringComponent({
    children
}: {
    children: ReactNode
}) {
    const props = useSpring({
        config: {
            duration: 3000,
        },
        delay: 3000,
        from: {
            width: "100%",
            height: "100%",
            background: "white",
        },
        to: {
            width: "100%",
            height: "70%",
            background: "white",
        },
    })

    return (
        <div style={{
            display: "flex",
            width: "100%",
            height: "100%",
            background: "black",
            alignItems: "center",
        }}>
            <animated.div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                ...props,
            }}>{children}</animated.div>
        </div>
    );
}

export default function SpringAnimation() {
    return (
        <>
            <UseSpringComponent>
                {/* <UseChainComponent /> */}
                <UseTransitionComponent />
            </UseSpringComponent>
        </>
    );
}