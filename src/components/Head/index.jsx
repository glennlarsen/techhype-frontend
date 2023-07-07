import { Helmet } from "react-helmet";

const Head = ({ page, description }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>Techhype | {page}</title>
      <link rel="canonical" href="" />
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default Head;
