import { Box } from "@chakra-ui/react";
import { css } from "@emotion/react";
import type { NextPage } from "next";
import { useEffect } from "react";
import { useAccount } from "wagmi";

import {
  selectors as gallerySelectors,
  sagaActions as gallerySagaActions,
} from "@/state/gallery";
import { useAppDispatch, useAppSelector } from "@/state/reduxHooks";

import { HomeFAQsView } from "./HomeFAQsView";
import { HomeGalleryView } from "./HomeGalleryView";
import { HomeScrollFixedView } from "./HomeScrollFixedView";
import { useScrollAnimate } from "./useScrollAnimate";

// translateY(calc(${15}vh + ${scrollY}px))

export const Home: NextPage = () => {
  // const containerRef = useRef(null);
  const { address } = useAccount();
  const items = useAppSelector(gallerySelectors.selectGalleryItems);
  const shellNumber = useAppSelector(gallerySelectors.selectShellItemNumber);
  const loading = useAppSelector(gallerySelectors.selectLoading);
  const appDispatch = useAppDispatch();

  useEffect(() => {
    appDispatch(gallerySagaActions.fetchGalleryItems({ address }));
  }, [address, appDispatch]);

  const {
    // hBarOpacity,
    // progressRef,
    // scrollOpacityRef,
    // vBarOpacity,
    FIXED_SCROLL_PARAM,
    scrollY,
  } = useScrollAnimate();
  return (
    <div
      css={css`
        width: 100%;
        min-height: 250vh;
        position: relative;
        /* background-color: "white"; */
      `}
    >
      <HomeScrollFixedView />

      <Box
        css={css`
          transform: translateY(
            ${scrollY > FIXED_SCROLL_PARAM ? -window.innerHeight / 2 : 0}px
          );
          transition: all 1.5s cubic-bezier(0.77, 0, 0.175, 1);
        `}
        opacity={scrollY > FIXED_SCROLL_PARAM ? 1 : 0}
        // transform={scrollY > FIXED_SCROLL_PARAM ? 0 : 0}
        // scrollY > FIXED_SCROLL_PARAM ? `${fixedTopRef.current - 120}px` :
      >
        <HomeGalleryView
          items={items}
          shellNumber={shellNumber}
          loading={loading}
        />
        <HomeFAQsView />
      </Box>
    </div>
  );
};
