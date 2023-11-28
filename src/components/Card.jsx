import React from "react";
import { infoPlans } from "./CardText";

function Card() {
  return (
    <div className="mx-auto mx-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
      <h2 className="text-center font-bold text-slate-850 text-teal-600 bg-gray-100 sm:text-5xl sm:leading-tight sm:tracking-tight">
        Health Plans.
      </h2>
      <div className="mx-auto grid max-w-7xl lg:grid-cols-2 gap-12 lg:gap-8 py-24 px-4 sm:px-6 lg:px-24">
        {infoPlans.map((plan) => (
          <div
            key={plan.title}
            className="border border-slate-200 p-8 shadow-lg bg-white rounded-2xl relative flex flex-col"
          >
            <h3 className="text-lg font-semibold leading-5">{plan.title}</h3>
            {plan.mostPopular && (
              <p className="absolute top-0 -translate-y-1/2 bg-teal-500 text-white px-3 py-0.5 text-sm font-semibold tracking-wide rounded-full shadow-md">
                Most Popular
              </p>
            )}
            <p className="mt-4 text-slate-700 text-sm leading-6">
              {plan.description}
            </p>
            <div className="mt-4 bg-slate-50 p-6 rounded-lg -mx-6">
              <p className="text-sm font-semibold text-slate-500 flex items-center">
                <span>{plan.currency}</span>
                <span className="text-4xl text-slate-900 ml-3">
                  ${plan.price}
                </span>
                <span className="ml-1.5">{plan.frequency}</span>
              </p>
            </div>
            {/* Features */}
            <ul className="mt-6 space-y-4 flex-1">
              {plan.features.map((features) => (
                <li
                  key={features}
                  className="text-sm text-slate-700 leading-6 flex"
                >
                  <svg
                    className="h-4 w-4 text-teal-500 shrink-0"
                    fill="#000000"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 479.104 479.104"
                    xmlSpace="preserve"
                  >
                    <path
                      d="M471.121,113.606l-50.758-50.741c-10.642-10.644-27.881-10.644-38.522,0L180.146,264.574L97.303,181.73 c-10.644-10.643-27.898-10.658-38.538-0.017L7.99,232.504C-2.653,243.146-2.668,260.4,7.974,271.043L148.14,411.226 c17.287,17.284,45.31,17.333,62.659,0.11c64.093-63.647,208.114-207.158,260.291-259.145c5.129-5.111,8.014-12.043,8.014-19.275 C479.12,125.668,476.235,118.736,471.121,113.606z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="ml-3">{features}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
