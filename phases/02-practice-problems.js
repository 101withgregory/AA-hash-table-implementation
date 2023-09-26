function anagrams(str1, str2) {
  const sortedStr1 = str1.toLowerCase().replace(/[^a-z]/g, '').split('').sort().join('');
  const sortedStr2 = str2.toLowerCase().replace(/[^a-z]/g, '').split('').sort().join('');
  
  return sortedStr1 === sortedStr2;
}



function commonElements(arr1, arr2) {
  const set = new Set(arr1);
  const result = [];

  for (let i = 0; i < arr2.length; i++) {
    if (set.has(arr2[i])) {
      result.push(arr2[i]);
    }
  }

  return result;
}



function duplicate(arr) {
  const set = new Set();

  for (let num of arr) {
    if (set.has(num)) {
      return num; // Found the duplicate
    }
    set.add(num);
  }

  // No duplicate found
  return -1;
}



function twoSum(nums, target) {
  // Your code here
  //a set to store all the unique values
  const numSet = new Set();
  for ( let num of nums){
    let complement = target - num;
    if(numSet.has(complement)){
      return true;
    }
    numSet.add(num);
  }

  return false;
}


function wordPattern(pattern, words) {
  if (pattern.length !== words.length) {
    return false; // Different pattern and word array lengths, not a valid match
  }

  const charToWordMap = {};
  const wordSet = new Set();

  for (let i = 0; i < pattern.length; i++) {
    const char = pattern[i];
    const word = words[i];

    if (charToWordMap[char]) {
      // Check if the character has been mapped to a different word
      if (charToWordMap[char] !== word) {
        return false;
      }
    } else {
      // Check if the word has already been used for a different character
      if (wordSet.has(word)) {
        return false;
      }

      charToWordMap[char] = word;
      wordSet.add(word);
    }
  }

  return true;
}



module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];