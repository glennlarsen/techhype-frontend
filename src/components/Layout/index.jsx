import Footer from "components/Footer";
import Navigation from "components/Navigation";

function Layout({ children }) {

  return (
    <>
      <div className="wrapper">
        <Navigation />
            {children}
        <Footer />
      </div>
    </>
  );
}

export default Layout;
