import CategoryRecord from "../components/CategoryRecord.tsx";

const RecordsPage = () => {
  return (
    <div>
      <h1>Records</h1>
        <div className="flex flex-row flex-wrap justify-evenly items-start p-6">
            <CategoryRecord category={{id: 1, name: "25cl"}}/>
            <CategoryRecord category={{id: 1, name: "50cl"}}/>
        </div>
    </div>
  );
}

export default RecordsPage;