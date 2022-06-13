import React, { useEffect, useState } from "react";
import "./App.css";
import Paginator from "./components/Paginator";

const ITEMS_PER_PAGE = 10;

function App() {
  const [repos, setRepos] = useState([]);
  const [visibleList, setVisibleList] = useState<any[]>([]);

  useEffect(() => {
    fetch(
      "https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=100"
    )
      .then((res) => res.json())
      .then((json) => {
        setRepos(json.items);
      });
  }, []);

  if (!repos.length) return <div>Loading</div>;

  return (
    <div className="h-screen">
      <table className={"w-full table-fixed h-2/3"}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Stars</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {visibleList.map(
            ({ description, name, html_url, stargazers_count }) => (
              <tr key={name} className={"odd:bg-white even:bg-gray-50"}>
                <td className={"px-10"}>{name}</td>
                <td className={"px-10"}>{description}</td>
                <td className={"px-10 flex justify-center"}>
                  {stargazers_count}
                </td>
                <td>
                  <div className={"flex justify-center"}>
                    <a target={"_blank"} href={html_url}>
                      Link
                    </a>
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <Paginator
        originalList={repos}
        setVisibleList={setVisibleList}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </div>
  );
}

export default App;
