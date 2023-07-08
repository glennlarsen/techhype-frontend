import Footer from "components/Footer";
import Navigation from "components/Navigation";
import Head from "components/Head";

function Layout({ page, description, children, scrollToSection }) {
  return (
    <>
      <Head page={page} description={description} />
      <div className="wrapper">
        <Navigation scrollToSection={scrollToSection} />
        {children}
        <Footer scrollToSection={scrollToSection} />
      </div>
    </>
  );
}

export default Layout;
