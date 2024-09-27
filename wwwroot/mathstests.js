$(() => {
  const tests = [
    ["?op=+&x=-111&y=-244", "-355"],
    ["?op=-&x=1&y=abc", "'y' parameter is not a number"],
    ["?n=a&op=p", "'n' parameter is not a number"],
    ["?op=-&x=111&y=244", "-133"],
    ["?op=*&x=11.56&y=244.12345", "2822.067082"],
    ["?op=/&x=99&y=11.06", "8.95117540687161"],
    ["?op=/&x=99&y=0", "'Infinity'"],
    ["?op=/&x=0&y=0", "'NaN'"],
    ["?op=%&x=5&y=5", "0"],
    ["?op=%&x=100&y=13", "9"],
    ["?op=%&x=100&y=0", "'NaN'"],
    ["?op=!&n=0", "'n' parameter must be an integer > 0"],
    ["?op=p&n=0", "'n' parameter must be an integer > 0"],
    ["?op=p&n=1", false],
    ["?op=p&n=2", true],
    ["?op=p&n=5", true],
    ["?op=p&n=6", false],
    ["?op=p&n=6.5", "'n' parameter must be an integer > 0"],
    ["?op=p&n=113", true],
    ["?op=p&n=114", false],
    ["?op=np&n=1", "2"],
    ["?op=np&n=30", "113"],
    ["?op=+&X=111&y=244", "'x' parameter is missing"],
    ["?op=+&x=111&Y=244", "'y' parameter is missing"],
    ["?op=*&x=111&y=244&z=0", "'too many parameters'"],
    ["?op=!&n=5.5", "'n' parameter must be an integer > 0"],
    ["?op=&z=0", "'op' parameter is missing"],
  ];

  $("#startTests").on("click", function () {
    // Clear the tests div before appending results
    $(".tests").empty();

    const baseUrl = $("#url").val(); // get the base URL from the #url div

    tests.forEach(([queryParams, expected]) => {
      const testUrl = `${baseUrl}${queryParams}`;

      // Use fetch to make a GET request
      fetch(testUrl)
        .then((response) => response.json())
        .then((data) => {
          // Extract 'value' or 'error' from the response object
          const actual =
            data.value != undefined ? data.value : data.error || "undefined";

          // Compare actual result with the expected result
          const result =
            actual == expected
              ? "PASSED"
              : "<span style='color: red;'>FAILED</span>";

          // Append the result to the .tests div
          $(".tests").append(
            `${result} --> ${queryParams} - Expected: ${expected}, Received: ${actual}</br>`
          );
        })
        .catch((error) => {
          $(".tests").append(
            `<div>Test URL: ${testUrl} - FAILED (Error in request: ${error})</div>`
          );
        });
    });
  });
});
