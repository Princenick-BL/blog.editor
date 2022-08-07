import React, { useState, useEffect } from "react";
import { addDays } from "date-fns";
import CustomDatePicker from "./datepicker";
import { queryReport } from "./queryReport";
import {
  ChartTitle,
  ReportWrapper,
  Subtitle,
  DatepickerRow,
  StyledTable,
} from "./styles";
import styles from './index.module.scss'

const PageviewsReport = (props) => {
  const [reportData, setReportData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const displayResults = (response) => {
    const queryResult = response.result.reports[0].data.rows || [];
    setTotalPages(queryResult.length);
    const total = response.result.reports[0].data.totals[0].values[0];
    let newReportData = [];
    queryResult.forEach((row, idx) => {
      if (idx < 10) {
        let tempObj = {
          path: row.dimensions[0],
          views: row.metrics[0].values[0],
          perc: `${parseFloat((row.metrics[0].values[0] / total) * 100).toFixed(
            1
          )}%`,
        };
        newReportData.push(tempObj);
      }
    });
    setReportData(newReportData);
  };

  useEffect(() => {
    const request = {
      viewID: props.viewID,
      startDate : props.startDate,
      endDate : props.endDate,
      metrics: "ga:pageviews",
      dimensions: ["ga:pagePath"],
      orderBy: {
        fieldName: "ga:pageViews",
        order: "DESCENDING",
      },
      filter: "ga:pagePath!@localhost/",
    };
    setTimeout(
      () =>
        queryReport(request)
          .then((resp) => displayResults(resp))
          .catch((error) => console.error(error)),
      1000
    );
  }, [props]);

  return (
    <>
    <ReportWrapper>
      <ChartTitle>Top 10 Pages by Views</ChartTitle>
         
      <Subtitle>{`Total pages - ${totalPages}`}</Subtitle>
       
      {reportData.length && (
        <StyledTable>
          <thead>
            <tr>
              <th>Page</th>
              <th>Views</th>
              <th>%</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((row, id) => (
              <tr key={id}>
                <td className="left-align">{row.path}</td>
                <td>{row.views}</td>
                <td>{row.perc}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      )}
    </ReportWrapper>
    <br></br>
    </>
  );
};

export default PageviewsReport;
