

import { Empty } from "keep-react";
import Proptypes from 'prop-types';

export const EmptyComponent = (props) => {
  return (
    <Empty
      title={props.title}
      content={props.content}
      image={
        <img
          src="https://staticmania.cdn.prismic.io/staticmania/a8befbc0-90ae-4835-bf37-8cd1096f450f_Property+1%3DSearch_+Property+2%3DSm.svg"
          height={234}
          width={350}
          alt="404"
        />
      }
    />
  );
}

EmptyComponent.propTypes = {
  title: Proptypes.string,
  content: Proptypes.string,
};
