import React, { useEffect } from 'react';
import Video from './Bg_video/Bg_video.jsx';
import IntroDiv from './Intro/Intro.jsx';
import Event from './Event/Event.jsx';
import TeamDiv from './TeamDiv/TeamDiv.jsx';
import Blog from './Blog/Blog.jsx';
import President from './President/President.jsx';
import Contact from './ContactUs/Contact.jsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { startAt } from 'firebase/firestore';

gsap.registerPlugin(ScrollTrigger);

function Home() {
  useEffect(() => {
    const introElements = [
      { trigger: '.glogo-image', animation: { xPercent: -180, duration: 1 } },
      { trigger: '.gmotto', animation: { y: 20, opacity: 0, duration: 1.5 } },
      { trigger: '.ginfo-head', animation: { xPercent: 200, duration: 1 } },
      { trigger: '.ginfo-content', animation: { scale: 0, duration: 1.5 } },
      { trigger: '.gknow-more', animation: { y: -50, opacity: 0, duration: 1, ease: 'bounce.out' } },
    ];

    const eventElements = [
      { trigger: '.gevent-heading', animation: { scale: 0, duration: 1 } },
      { trigger: '.gevent-img', animation: { x: 150, opacity: 0, duration: 1.5 } },
      { trigger: '.gevent-info', animation: { y: 150, opacity: 0, duration: 1.5 } },
      { trigger: '.gmore-event', animation: { y: -100, opacity: 0, duration: 1, ease: 'bounce.out' } },
    ];

    // Function to create animations for elements
    const createAnimations = (elements, start) => {
      elements.forEach((el) => {
        gsap.from(el.trigger, {
          ...el.animation,
          scrollTrigger: {
            trigger: el.trigger,
            start:el.trigger==".gmotto"||".gmore-event"?"top 85%":start,
            toggleActions: 'play pause resume reset',
          },
        });
      });
    };

    // Media queries for responsive animations
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      createAnimations(introElements, "top 60%");
      createAnimations(eventElements, "top 70%");
    });

    mm.add("(max-width: 767px)", () => {
      createAnimations(introElements, "top 80%");
      createAnimations(eventElements, "top 80%");
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      mm.kill();
    };
  }, []);

  return (
    <>
      <Video />
      <IntroDiv />
      <Event />
      <TeamDiv />
      <Blog />
      {/* <President /> */}
      <Contact />
    </>
  );
}

export default Home;
