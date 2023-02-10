import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import parse from "html-react-parser";
import Ad from "../../ads/ad";
import advertising from "../../ads/advertising";
import { useInView } from "react-intersection-observer";
import { changeUrl } from "../../common/utils";
import { userParams } from "../../common/userParams";
import { Container, Title, Text } from "@mantine/core";
import tracking from "../../tracking/tracking";

export default function OnePage({ data }) {
  const [openToPage, setOpenToPage] = useState(5);
  const [firstInView, setFirstInView] = useState(0);
  const [pagesInView, setPagesInView] = useState({});
  const { ref: endOfContentRef, inView: openMore } = useInView({
    rootMargin: "500px",
  });
  const firstRun = useRef({
    firstInView: true,
    openToPage: true,
    pagesInView: true,
  });

  const onItemInViewChange = useCallback(
    (inView, key) => {
      setPagesInView((prev) => {
        const sectionObj = prev[key] || { inView: false, tracked: false };
        sectionObj.inView = inView;
        return { ...prev, [key]: sectionObj };
      });
    },
    [setPagesInView]
  );

  useEffect(() => {
    if (firstRun.current.firstInView) {
      firstRun.current.firstInView = false;
      return;
    }
    console.log("firstInView", firstInView);
    changeUrl(firstInView);
    const val = pagesInView[firstInView];
    if (val && !val.tracked) {
      //track pageView
      tracking.trackPageView(firstInView);
      const sectionObj = pagesInView[firstInView];
      sectionObj.tracked = true;
      setPagesInView({ ...pagesInView, [firstInView]: sectionObj });
    }
  }, [firstInView]);

  useEffect(() => {
    if (firstRun.current.pagesInView) {
      firstRun.current.pagesInView = false;
      return;
    }
    const firstPageInView = Object.entries(pagesInView).find(([page, val]) => val.inView);
    const [page, val] = firstPageInView || [];
    if (page && page !== firstInView) {
      setFirstInView(page);
    }
  }, [pagesInView]);

  useEffect(() => {
    if (openMore) {
      setOpenToPage((prev) => {
        return Math.min(prev + 2, data.items_count);
      });
    }
  }, [openMore]);

  useEffect(() => {
    if (firstRun.current.openToPage) {
      firstRun.current.openToPage = false;
      return;
    }
    advertising.runAuction();
  }, [openToPage]);

  return (
    <>
      <Title size={50}>{data.title}</Title>
      <Text order={6} color="dimmed">
        Posted by {data.author}
      </Text>
      {data.content.map((item, index) => index < openToPage && <ItemSection key={index} index={index} item={item} onInViewChange={onItemInViewChange}></ItemSection>)}
      <div ref={endOfContentRef}></div>
    </>
  );
}

const ItemSection = ({ item, index, onInViewChange }) => {
  const { isMobile } = userParams;
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const didMount = useRef(false);

  const contentPart1 = item.split("<img")[0];
  const contentPart2 = "<img" + item.split("<img")[1];
  const canShowFirstAd = index !== 0;
  const canShowSecondAd = index !== 0 && index !== 1;

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    onInViewChange(inView, index);
  }, [inView]);

  return (
    <>
      <div className="item-section" ref={ref}>
        {parse(contentPart1)}
        {canShowFirstAd && <Ad page={index} adId={isMobile ? "maor2" : "maor"} width={isMobile ? "300" : "728"} height={isMobile ? "270" : "110"}></Ad>}
        {parse(contentPart2)}
        {canShowSecondAd && <Ad page={index} adId={isMobile ? "maor2" : "maor"} width={isMobile ? "300" : "728"} height={isMobile ? "270" : "110"}></Ad>}
      </div>
    </>
  );
};
