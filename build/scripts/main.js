let focussed = { year: false, month: false };

let months = {
  1: {
    title: "January",
    days: 31
  },
  2: {
    title: "Febuary",
    days: 28
  },
  3: {
    title: "March",
    days: 31
  },
  4: {
    title: "April",
    days: 30
  },
  5: {
    title: "May",
    days: 31
  },
  6: {
    title: "June",
    days: 30
  },
  7: {
    title: "July",
    days: 31
  },
  8: {
    title: "August",
    days: 31
  },
  9: {
    title: "September",
    days: 30
  },
  10: {
    title: "October",
    days: 31
  },
  11: {
    title: "November",
    days: 30
  },
  12: {
    title: "December",
    days: 31
  }
};

let timeEntries = {
  2019: {
    // 1: {
    //   2: {
    //     title: "Test Title",
    //     desc:
    //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at ligula varius, mattis urna sed, auctor tellus. Aliquam fringilla gravida imperdiet. Aliquam elementum vulputate quam. Pellentesque imperdiet neque sit amet tellus finibus tempor. Quisque nunc est, viverra vel maximus non, fringilla in nulla. Morbi vestibulum turpis et est luctus, in tempus sapien iaculis. Sed in nisi in leo luctus finibus. Donec mattis eleifend auctor."
    //   }
    // }
  },
  2018: {},
  2017: {},
  2016: {},
  2015: {},
  2014: {},
  2013: {},
  2012: {},
  2011: {},
  2010: {},
  2009: {},
  2008: {},
  2007: {},
  2006: {},
  2005: {},
  2004: {},
  2003: {},
  2002: {},
  2001: {},
  2000: {},
  1999: {},
  1998: {},
  1997: {}
};

document.addEventListener("DOMContentLoaded", () => {
  let yearKeys = Object.keys(timeEntries).reverse();
  let timeline = document.getElementsByClassName("timeline")[0];
  let timelineLine = document.getElementsByClassName("timeline_line")[0];

  for (const yearKey in yearKeys) {
    if (yearKeys.hasOwnProperty(yearKey)) {
      const year = yearKeys[yearKey];
      let yearElement = document.createElement("li");
      yearElement.innerHTML = year;
      yearElement.setAttribute("id", `${year}yearElement`);
      yearElement.addEventListener("click", () => onClick(true, yearElement));
      timeline.appendChild(yearElement);
    }
  }

  let computedTimelineStyle = window.getComputedStyle(timeline);
  timelineLine.style.width = computedTimelineStyle.width;
});

function onClick(year, element) {
  let timeline = document.getElementsByClassName("timeline")[0];
  let timelineLine = document.getElementsByClassName("timeline_line")[0];
  let timelineWrapper = document.getElementsByClassName("timeline_wrapper")[0];
  if (year) {
    console.log("Is year.");
    if (focussed.year) return;
    console.log("No year focus.");
    let yearElement = element;
    let proceedingYear = getPreceedingYear(Number(yearElement.innerHTML));
    console.log(`Proceeding Year: ${proceedingYear}.`);
    let proceedingYearElement = isYearElement(proceedingYear);
    if (proceedingYearElement === null) {
      console.log("Proceeding year is null.");
      let lastYearElement = document.createElement("li");
      lastYearElement.innerHTML = `${Number(yearElement.innerHTML) - 1}`;
      lastYearElement.setAttribute(
        "id",
        `${Number(yearElement.innerHTML) - 1}yearElement`
      );
      timeline
        .appendChild(lastYearElement);
      proceedingYearElement = document.getElementById(
        `${Number(yearElement.innerHTML) - 1}yearElement`
      );
    }

    if (proceedingYearElement !== undefined && proceedingYearElement !== null) {
      console.log("Got proceeding element.");
    }

    clearTimeline([yearElement, proceedingYearElement]);
    timeline.style.width = "90%";
    timeline.style.marginLeft = '5%';
    timeline.style.marginRight = '5%'
    timelineLine.style.width = "1200px";
    timelineLine.style.marginLeft = '10%';
    timelineLine.style.marginRight = '5%';
    timelineWrapper.style.overflow = 'hidden';
    proceedingYearElement.style.marginLeft = '1180px';

  } else {
    if (focussed.month) return;
  }
}

function recomputeTimelineLine() {
  let timelineLine = document.getElementsByClassName("timeline_line")[0];
  let computed = window.getComputedStyle(timelineLine);
  timelineLine.style.width = document.getElementsByClassName(
    "timeline"
  )[0].style.width;
}

/**
 * Returns the preceeding month of a month.
 *
 * @param {number} monthId - id of a month.
 */
function findPreceedingMonth(monthId) {
  if (monthId < 1 || monthId > 12)
    throw new Error("Month id cannot be smaller than 1 or bigger than 12.");
  if (monthId === 1) return 12;
  return monthId - 1;
}

/**
 * Gets the name of the month and returns the id of that month.
 * @param {string} textMonth - the name of a month.
 */
function monthTexttoId(textMonth) {
  let ids = Object.keys(months);

  for (const id in months) {
    if (months.hasOwnProperty(id)) {
      const month = months[id];

      if (textMonth.toLowerCase() === month.title.toLowerCase()) return id;
    }
  }
}

function clearTimeline(whitelist) {
  let entries = Array.from(
    document.getElementsByClassName("timeline")[0].children
  );
  console.log(`Size of array: ${entries.length}`);

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];

    let whitelisted = false;

    console.log(`Whitelist size: ${whitelist.length}`);
    for (let i = 0; i < whitelist.length; i++) {
      const whitelistEntry = whitelist[i];

      console.log(`Whitelist entry: ${whitelistEntry}`);
      if (entry.innerHTML === whitelistEntry.innerHTML) {
        whitelisted = true;
        break;
      }
    }

    console.log(`Whitelisted: ${whitelisted}`);
    if (whitelisted) continue;
    entry.remove();
  }
}

/**
 * Returns the name of a month corresponding to the month id.
 * @param {number} monthId - an id of a month.
 */
function monthIdtoText(monthId) {
  if (monthId < 1 || monthId > 12)
    throw new Error("Month id cannot be smaller than 1 or bigger than 12.");
  return months[monthId].title;
}

/**
 * Gets the preceeding the year injected.
 * @param {number} year - a year.
 */
function getPreceedingYear(year) {
  return year - 1;
}

/**
 * Checks if a year is a visible elements on the timeline.
 * In the example of the last element, the proceeding year is not visible
 * on the timeline.
 *
 * @param {number} year
 */
function isYearElement(year) {
  let yearKeys = Object.keys(timeEntries);

  for (const yearKey in yearKeys) {
    if (yearKeys.hasOwnProperty(yearKey)) {
      const year2 = yearKeys[yearKey];

      if (year === Number(year2))
        return document.getElementById(`${year}yearElement`);
    }
  }

  return null;
}
