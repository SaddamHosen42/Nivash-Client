import { Helmet } from "react-helmet-async";

const PageTitle = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | Nivash</title>
    </Helmet>
  );
};

export default PageTitle;
