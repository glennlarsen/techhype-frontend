import Footer from "components/Footer";
import Navigation from "components/Navigation";
import Head from "components/Head";

function Layout({ page, description, children, toggleDrawer }) {
  return (
    <>
      <Head page={page} description={description} />
        <Navigation toggleDrawer={toggleDrawer}  />
        {children}
      <Footer />
    </>
  );
}

export default Layout;
