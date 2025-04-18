import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Model from "../components/Model";
import HeroSection from "../components/HeroSection";
import LatestBlog from "../components/LatestBlog";
import CategoryExplorer from "../components/CategoriesExplorer";
import PopulerPost from "../components/PopularPost";
import HrLine from "../components/HrLine";
import Footer from "../components/Footer";
import NavScroll from "../components/navScroll";
import axios from "axios";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import API from "../utils/axiosInstance";
function Home() {
  const [homeData, setHomeData] = useState({ blogData: "" });
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    async function getHomeData() {
      try {
        const res = await API.get("/homepage", {
          withCredentials: false,
        });
        // console.log(import.meta.env.VITE_API_BASE_URL);
        // console.log(API.defaults.baseURL);
        console.log(res, "ressssss");
        setHomeData(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getHomeData();
  }, []);

  // console.log(homeData.blogData);

  return (
    <>
      <div className="background">
        {/* <NavScroll /> */}

        <Navbar />

        <HeroSection
          heading={"Your Guide To A Healthier Life"}
          text="       Read expert tips on wellness, mental health, and fitness Explore
          expert-backed health insights, mindful living tips, and
          scientifically proven wellness strategies."
          btnText={"Download Free Guide"}
        />
        <div className="bg">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {
                <>
                  <LatestBlog
                    blogData={homeData.blogData}
                    isLoading={isLoading}
                  />
                  <div className=" flex justify-end px-10">
                    <div className="">
                      <Button onClick={() => navigate("/posts")}>
                        Explore More
                      </Button>
                    </div>
                  </div>
                </>
              }
              <CategoryExplorer categoryData={homeData.categoryData} />
              <HrLine width={4} />
              <PopulerPost data={homeData.blogData} />
            </>
          )}
        </div>
        <HrLine width={4} />
        <Footer />
      </div>
    </>
  );
}

export default Home;
