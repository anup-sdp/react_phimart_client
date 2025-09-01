const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  return (
    <div className="flex justify-center mb-6">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => handlePageChange(i + 1)}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === i + 1 ? "bg-secondary text-white" : "bg-gray-200"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;

// bg-secondary from daisyui, not builtin in tailwind

/*
Array.from()

const set = new Set([1, 2, 3, 2, 1]);
const array1 = Array.from(set);
console.log(array1); // [ 1, 2, 3 ]

const nums = [1, 2, 3];
const doubled = Array.from(nums, x => x * 2);
console.log(doubled); // [2, 4, 6]

const arr = Array.from({ length: 5 }, (val, i) => i + 1);
console.log(arr); // [1, 2, 3, 4, 5]

const arrayLike = {
    '0': 'apple',
    '1': 'banana',
    '2': 'cherry',
    length: 3
};
const withArrayFrom = Array.from(arrayLike);
console.log(withArrayFrom); // ['apple', 'banana', 'cherry']

*/