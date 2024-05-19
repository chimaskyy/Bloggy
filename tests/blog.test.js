// Import the necessary dependencies for testing
const { expect } = require("chai");

// Import the function to be tested
const calculateReadingTime =
  require("../controllers/blogController").calculateReadingTime;

// Test cases for calculateReadingTime function
describe("calculateReadingTime", () => {
  it('should return "Less than 1 minute" for empty text', () => {
    const text = "";
    const result = calculateReadingTime(text);
    expect(result).to.equal("Less than 1 minute");
  });

  it('should return "1 minute" for a text with 200 words', () => {
    const text =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl ac aliquam tincidunt, justo nunc tincidunt nunc, id tincidunt nunc nisl id nunc.";
    const result = calculateReadingTime(text);
    expect(result).to.equal("1 minute");
  });

  it('should return "2 minutes" for a text with 400 words', () => {
    const text =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl ac aliquam tincidunt, justo nunc tincidunt nunc, id tincidunt nunc nisl id nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl ac aliquam tincidunt, justo nunc tincidunt nunc, id tincidunt nunc nisl id nunc.";
    const result = calculateReadingTime(text);
    expect(result).to.equal("2 minutes");
  });
});
