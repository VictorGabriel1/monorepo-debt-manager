import { Box } from "@/global/styles/GlobalStyles";
import styled from "styled-components";

export const ListBox = styled(Box)`
  flex: 1;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  thead {
    background-color: #f5f5f5;
  }

  th {
    border-bottom: 2px solid #ddd;
    padding: 8px;
    text-align: left;
    font-weight: bold;
  }

  tr {
    &:nth-child(even) {
      background-color: #f9f9f9;
    }
  }

  td {
    padding: 8px;
    border-bottom: 1px solid #ddd;
    font-weight: normal;
  }

  tbody tr:hover {
    background-color: #f1f1f1;
    transition: background-color 0.2s ease-in-out;
  }

  .overdue {
    background-color: #ffebee;
  }

  .actions {
    height: 100%;
    div {
      gap: 8px;
      display: flex;
      flex-direction: row;
    }

    button {
      padding: 6px 12px;
      font-size: 14px;
      cursor: pointer;
    }

    button:first-child {
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;

      &:hover {
        background-color: #0056b3;
      }
    }

    button:last-child {
      background-color: #dc3545;
      color: white;
      border: none;
      border-radius: 4px;

      &:hover {
        background-color: #a71d2a;
      }
    }
  }
`;
