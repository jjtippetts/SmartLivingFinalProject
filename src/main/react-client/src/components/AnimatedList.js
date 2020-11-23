import React, { useRef } from 'react';
import { animated, useTransition, useChain } from 'react-spring';

function AnimatedList(props) {
    const transitionRef = useRef();
    const transitions = useTransition(props.items, item => item.key, {
        ...props.config,
        trail: 600 / props.items.length,
        ref: transitionRef,
        config: {
            mass: 2,
            friction: 60,
            tension: 280,
            precision: 0.0001,
            clamp: true,
        }
    });

    useChain([transitionRef]);

    return transitions.map(({item, key, props}) => {
        return <animated.div key={key} style={props}>{item}</animated.div>;
    });
}

export default AnimatedList;