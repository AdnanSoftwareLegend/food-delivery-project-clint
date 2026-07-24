import Hero from "../../components/Hero";
import AboutUs from "../AboutUs/AboutUs";
import DailyOffers from "../DailyOffers/DailyOffers";
import ExploreSection from "../ExploreSection/ExploreSection";
import Meals from "../Meals/Meals";
import ReviewSection from "../ReviewSection/ReviewSection";


const Home = () => {
    return (
        <div>
          <Hero></Hero>
          <ExploreSection></ExploreSection>
          <DailyOffers></DailyOffers>
          <Meals></Meals>
          <ReviewSection></ReviewSection>
          <AboutUs></AboutUs>
        </div>
    );
};

export default Home;

