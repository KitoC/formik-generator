import { css } from "styled-components";

const sectionStyles = css`
  .section {
    display: flex;
    flex-direction: column;

    & > div:not(.progress) {
      padding: 10px 0;
      padding-left: 10px;
    }
  }

  .section-header {
    border-bottom: 1px solid lightgrey;
    margin-top: 10px;
    padding-bottom: 5px;
  }
`;

const buttonStyles = css`
  .button-bar {
    display: flex;
    margin-top: 10px;
  }

  .button {
    background-color: lightgrey;
    width: fit-content;
    padding: 5px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 10px;
    cursor: pointer;

    .title {
      font-size: 10px;
    }
  }
`;

const progressStyles = css`
  .progress-container {
    display: flex;
    width: 100%;

    &.right .progress {
      margin-left: 20px;
    }
  }

  .form-step {
    padding: 10px 20px;
    border-bottom: 1px solid lightgrey;
    cursor: pointer;

    &.active {
      border-left: 3px solid #035d85;
    }

    & p {
      margin: 0 !important;

      &.active,
      &:hover {
        font-weight: bold;
      }
    }

    .sub-progress {
      padding-left: 15px;
    }
  }

  .au-progress-indicator__link {
    border: none;

    &:hover {
      background: transparent;
    }
  }
`;

const accordionStylesV2 = css`
  .accordion-body {
    --active-color: rgba(3, 93, 133, 1);
    --border-radius: 5px;
    --border-color: lightgrey;

    display: flex;
    flex-direction: column;
    margin: 10px 0;

    .accordion-item {
      border: 1px solid var(--border-color);

      &.error {
        --active-color: #d60000;

        :not(.active) .accordion-banner {
          background: #d60000;
          color: white;
          opacity: 0.4;
        }
      }

      &:last-child {
        border-radius: 0 0 var(--border-radius) var(--border-radius);
      }
      &:first-child {
        border-radius: var(--border-radius) var(--border-radius) 0 0;
      }

      &:not(:last-child) {
        border-bottom: none;
      }

      &.active {
        --border-color: var(--active-color);
        border-bottom: 1px solid var(--border-color);
      }
    }

    .accordion-banner {
      opacity: 0.5;
      width: 100%;

      display: flex;
      justify-content: flex-start;

      &.active {
        border-bottom: 1px solid var(--active-color);
        background: var(--active-color);
        color: white;
      }

      &.active,
      &:hover,
      &:focus {
        opacity: 1;
        outline-offset: 1px !important;
      }

      font-weight: bold;
      padding: 5px 15px;
      color: var(--active-color);

      cursor: pointer;
    }

    .accordion-content {
      padding: 15px 15px;
    }
  }
`;

const defaultStyles = css`
  ${sectionStyles}
  ${accordionStylesV2}
  ${buttonStyles}
  ${progressStyles}
  
  width: 100%;

  .text-input {
    display: flex;
    flex-direction: column;
    margin-top: 0.5rem;
  }

  .form-container {
    min-width: 500px;
  }
`;

export default defaultStyles;
