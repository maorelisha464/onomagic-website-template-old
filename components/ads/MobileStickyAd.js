import Ad from "./ad";
import styled from "@emotion/styled";

const AdWrapperTitle = styled.div`
  &:before,
  &:after {
    background-color: #d9d9d9;
    content: "";
    display: inline-block;
    height: 1px;
    position: relative;
    vertical-align: middle;
    width: 13%;
  }

  text-align: center;
  color: #999;
  font-family: open sans;
  font-size: 9px;
  font-weight: 400;
  text-transform: uppercase;
  overflow: hidden;
  line-height: 11px;
  padding: 5px 0;
`;
const AdWrapper = styled.div`
  background: #f1f1f1;
  width: 100%;
  height: 80px;
  position: fixed;
  bottom: 0;
  left: 0;
  text-align: center;
`;

export default function MobileStickyAd({ adId }) {
  return (
    <AdWrapper>
      <AdWrapperTitle>
        <span>ADVERTISEMENT</span>
      </AdWrapperTitle>
      <Ad selfRefresh={30000} adId={adId} width={"300"} height={"270"} withoutWrapper={true}></Ad>
    </AdWrapper>
  );
}
