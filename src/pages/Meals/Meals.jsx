import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Card from '../Card/Card';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';

const Meals = () => {
  const axiosSecure = useAxiosSecure();

  const { data: meals = [], isLoading, error } = useQuery({
    queryKey: ['meals'],
    queryFn: async () => {
      const res = await axiosSecure.get('/meals');
      return res.data;
    }
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (error) return <p>Error loading meals</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {meals.map(meal => (
          <Card key={meal._id} meal={meal} />
        ))}

      </div>

    </div>
  );
};

export default Meals;