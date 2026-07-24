import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SearchPage = () => {
  const axiosSecure = useAxiosSecure();

  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {


    if (!query) return;
    const fetchMeals = async () => {
      try {
        setLoading(true);
        console.log("Searching:", query);
        const res = await axiosSecure.get(
          `/meals/search?query=${query}`
        );

        console.log("Response:", res.data);

        setResults(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [query, axiosSecure]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">
        Search Results:
        <span className="text-orange-500">
          {" "}
          {query}
        </span>
      </h2>

      {loading && (
        <div className="text-center">
          Loading...
        </div>
      )}

      {!loading && results.length === 0 && (
        <h3>No meals found</h3>
      )}

      <div className="grid md:grid-cols-3 gap-5">
        {results.map((meal) => (
          <div
            key={meal._id}
            className="card bg-base-100 shadow-xl"
          >
            <figure>
              <img
                src={meal.foodImage}
                alt={meal.foodName}
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">
                {meal.foodName}
              </h2>

              <p>{meal.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;