import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Hacer una solicitud a tu backend para obtener la lista de artículos
    axios
      .get("http://localhost:3000/articles")
      .then((response) => setArticles(response.data))
      .catch((error) => console.error("Error fetching articles:", error));
  }, []);

  return (
    <div className="mx-auto w-1/2 p-6 bg-white m-3 rounded-md shadow-md">
      <h2 className="text-3xl text-center mb-6 text-teal-600 font-semibold">
        List of articles
      </h2>
      <hr className="border-t-2 border-gray-300 mb-4" />
      <ul>
        {articles.map((article) => (
          <li key={article.id} className="flex items-start mb-6">
            <img
              src={article.imageUrl}
              alt={`Imagen para ${article.title}`}
              className="mr-4 max-w-32 rounded-md"
              height={300}
              width={300}
            />
            <div>
              <Link to={`/articles/${article.id}`} className="text-slate-600 hover:text-slate-900">
                <h3 className="text-xl font-semibold">{article.title}</h3>
                <p className="text-gray-500">
                  {new Date(article.creationDate).toISOString().split("T")[0]}
                </p>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Articles;
