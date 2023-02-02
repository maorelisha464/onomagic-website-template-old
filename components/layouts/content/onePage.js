import { useEffect, useState, useCallback, useRef, createElement, renderToStaticMarkup } from "react";
import ReactDOM from "react-dom";
import Ad from "../../ads/ad";
import advertising from "../../ads/advertising";
import { useInView } from "react-intersection-observer";
import { changeUrl } from "../../common/utils";
import useUserParams from "../../common/userParams";
import { Container, Title, Text } from "@mantine/core";
export default function OnePage({ data }) {
  // const { isMobile } = useUserParams();
  const [openToPage, setOpenToPage] = useState(5);
  const [firstInView, setFirstInView] = useState(0);
  const [pagesInView, setPagesInView] = useState({});
  const firstRunFirstInView = useRef(true);
  const firstRunOpenToPage = useRef(true);
  const firstRunPagesInView = useRef(true);
  const { ref: endOfContentRef, inView: openMore } = useInView({
    rootMargin: "500px",
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
    if (firstRunFirstInView.current) {
      firstRunFirstInView.current = false;
      return;
    }
    changeUrl(firstInView);
    const val = pagesInView[firstInView];
    if (val && !val.tracked) {
      const sectionObj = pagesInView[firstInView];
      sectionObj.tracked = true;
      setPagesInView({ ...pagesInView, [firstInView]: sectionObj });
    }
  }, [firstInView]);

  useEffect(() => {
    if (firstRunPagesInView.current) {
      firstRunPagesInView.current = false;
      return;
    }
    const firstPageInView = Object.entries(pagesInView).find(([key, val]) => val.inView);
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
    if (firstRunOpenToPage.current) {
      firstRunOpenToPage.current = false;
      return;
    }
    advertising.runAuction();
  }, [openToPage]);

  //   useEffect(() => {
  //     // return advertising.resetAds
  //   }, []);

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
  const { isMobile } = useUserParams();
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const adRef = useRef();
  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    onInViewChange(inView, index);
  }, [inView]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const img = adRef.current.querySelector("img");
    const imgParent = img.parentNode;
    const wrapper = document.createElement("div");
    wrapper.id = "ono-item-ad-wrapper";
    imgParent.insertBefore(wrapper, img);
    const ad = <Ad adId={isMobile ? "maor2" : "maor"} width={isMobile ? "300" : "728"} height={isMobile ? "270" : "110"}></Ad>;
    ReactDOM.render(ad, adRef.current.querySelector("#ono-item-ad-wrapper"));
  }, []);

  return (
    <>
      <div className="item-section" ref={ref}>
        <div ref={adRef} style={{ fontSize: "20px" }} dangerouslySetInnerHTML={{ __html: item }} />
        <Ad adId={isMobile ? "maor2" : "maor"} width={isMobile ? "300" : "728"} height={isMobile ? "270" : "110"}></Ad>
      </div>
    </>
  );
};
