import React from "react";
import styled from "styled-components";

const FavoriteButton = () => {
  return (
    <StyledWrapper>
      <div>
        <input
          defaultValue="favorite-button"
          name="favorite-checkbox"
          id="favorite"
          defaultChecked="checked"
          type="checkbox"
        />
        <label className="favoriteContainer" htmlFor="favorite">
          <svg
            className="feather feather-heart"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth={2}
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
            height={24}
            width={24}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <div className="action">
            <span className="option-1">Add to Favorites</span>
            <span className="option-2">Added to Favorites</span>
          </div>
        </label>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .favoriteContainer {
    background-color: rgb(36, 36, 36);
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px 15px;
    cursor: pointer;
    user-select: none;
    border-radius: 8px;
    color: rgb(255, 255, 255);
  }

  #favorite {
    display: none;
  }
  #favorite:checked + .favoriteContainer svg {
    fill: hsl(0deg 100% 50%);
    stroke: hsl(0deg 100% 50%);
    animation: heartButton 1s;
  }

  @keyframes heartButton {
    0% {
      transform: scale(1);
    }

    25% {
      transform: scale(1.3);
    }

    50% {
      transform: scale(1);
    }

    75% {
      transform: scale(1.3);
    }

    100% {
      transform: scale(1);
    }
  }

  #favorite + .favoriteContainer .action {
    position: relative;
    overflow: hidden;
    display: grid;
  }

  #favorite + .favoriteContainer .action span {
    grid-column-start: 1;
    grid-column-end: 1;
    grid-row-start: 1;
    grid-row-end: 1;
    transition: all 0.5s;
  }

  #favorite + .favoriteContainer .action span.option-1 {
    transform: translate(0px, 0%);
    opacity: 1;
  }

  #favorite:checked + .favoriteContainer .action span.option-1 {
    transform: translate(0px, -100%);
    opacity: 0;
  }

  #favorite + .favoriteContainer .action span.option-2 {
    transform: translate(0px, 100%);
    opacity: 0;
  }

  #favorite:checked + .favoriteContainer .action span.option-2 {
    transform: translate(0px, 0%);
    opacity: 1;
  }
`;

export default FavoriteButton;
