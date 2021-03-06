import React, { Fragment } from "react";
import { EuiText, EuiCode, EuiSpacer, EuiInMemoryTable } from "@elastic/eui";
import _ from "lodash";

export const PdfParser = ({ streams }) => {
  if (!streams) {
    return <Fragment />;
  }

  const renderStats = s => {
    if (!s || !s.length) {
      return <Fragment />;
    }

    const ppStats = s.map(s => {
      return <li key={s}>{s}</li>;
    });

    return (
      <Fragment>
        <h5>Stats</h5>
        <ul>{ppStats}</ul>
      </Fragment>
    );
  };

  const renderTags = t => {
    if (!t || !t.length) {
      return <Fragment />;
    }

    const ppTags = Object.keys(t).map(function(key) {
      const listItems = t[key].map(s => {
        return <li key={s}>{s}</li>;
      });
      return (
        <Fragment key={key}>
          <h6>{_.startCase(key)}</h6>
          <ul>{listItems}</ul>
        </Fragment>
      );
    });

    return (
      <Fragment>
        <h5>Tags</h5>
        {ppTags}
      </Fragment>
    );
  };

  const renderEmbeddedFilesTable = e => {
    if (!e || !e.length) {
      return <Fragment />;
    }
    const columns = [
      {
        field: "object",
        name: "Object",
        dataType: "string",
        align: "left",
        width: "30%"
      },
      {
        field: "sha256",
        name: "SHA-256",
        dataType: "number",
        align: "left",
        width: "70%"
      }
    ];
    return (
      <Fragment>
        <EuiText>
          <h5>Embedded Files</h5>
        </EuiText>
        <EuiInMemoryTable items={e} columns={columns} />
      </Fragment>
    );
  };

  const renderCarvedContent = cc => {
    if (!cc || !cc.length) {
      return <Fragment />;
    }

    const ccItems = cc.map(c => {
      return (
        <Fragment key={c.key}>
          <h6>{c.key}</h6>
          <EuiCode language="js" fontSize="l" paddingSize="s" color="dark">
            {c.content}
          </EuiCode>
        </Fragment>
      );
    });

    return (
      <Fragment>
        <EuiText>
          <h5>Carved Content</h5>
          {ccItems}
        </EuiText>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <EuiText>
        <h4>pdf-parser</h4>
        {renderStats(streams.stats)}
        {renderTags(streams.tags)}
      </EuiText>
      <EuiSpacer />
      {renderEmbeddedFilesTable(streams.embedded)}
      {renderCarvedContent(streams.carved.contents)}
      <EuiSpacer />
    </Fragment>
  );
};
