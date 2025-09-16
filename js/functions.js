function validateLength(string, maxLength) {
  return string.length <= maxLength;
}

function isPalindrome(palindrome) {
  function reverseString(string) {
    return string.split('').reverse().join('');
  }

  const formatted = palindrome
    .replaceAll(' ', '')
    .toLowerCase();

  return formatted === reverseString(formatted);
}

function extractNumbers(input) {
  const string = String(input);
  let result = '';

  for (let i = 0; i < string.length; i++) {
    const potentialNumber = parseInt(string.at(i), 10);

    if (Number.isInteger(potentialNumber)) {
      result += potentialNumber;
    }
  }

  return parseInt(result, 10);
}
