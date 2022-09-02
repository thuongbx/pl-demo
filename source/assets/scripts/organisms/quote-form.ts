// based on PHP Name Parser by Josh Fraser (joshfraser.com)
// http://www.onlineaspect.com/2009/08/17/splitting-names/
// ported to JavaScript by Mark Pemburn (pemburnia.com)
// released under Apache 2.0 license

(() => {
  // split full names into the following parts:
  // - prefix / salutation  (Mr., Mrs., etc)
  // - given name / first name
  // - middle initials
  // - surname / last name 
  // - suffix (II, Phd, Jr, etc)
  const parse = (fullLastName: string) => {
    fullLastName = fullLastName.trim();

    let nameParts = [];
    let lastName = "";
    let firstName = "";
    let initials = "";
    let word = null;
    let j = 0;
    let i = 0;

    // split into words
    // completely ignore any words in parentheses
    nameParts = fullLastName.split(" ").filter((namePart) => {
      return (namePart.indexOf("(") === -1);
    });

    const numWords = nameParts.length;
    // is the first word a title? (Mr. Mrs, etc)
    const salutation = is_salutation(nameParts[0]);
    const suffix = is_suffix(nameParts[numWords - 1]);
    // set the range for the middle part of the name (trim prefixes & suffixes)
    const start = (salutation) ? 1 : 0;
    const end = (suffix) ? numWords - 1 : numWords;

    word = nameParts[start];
    // if we start off with an initial, we'll call it the first name
    if (is_initial(word)) {
      // if so, do a look-ahead to see if they go by their middle name 
      // for ex: "R. Jason Smith" => "Jason Smith" & "R." is stored as an initial
      // but "R. J. Smith" => "R. Smith" and "J." is stored as an initial
      if (is_initial(nameParts[start + 1])) {
        firstName += " " + word.toUpperCase();
      } else {
        initials += " " + word.toUpperCase();
      }
    } else {
      firstName += " " + fix_case(word);
    }

    // concat the first name
    for (i = start + 1; i < (end - 1); i++) {
      word = nameParts[i];
      // move on to parsing the last name if we find an indicator of a compound last name (Von, Van, etc)
      // we do not check earlier to allow for rare cases where an indicator is actually the first name (like "Von Fabella")
      if (is_compound_lastName(word)) {
        break;
      }

      if (is_initial(word)) {
        initials += " " + word.toUpperCase();
      } else {
        firstName += " " + fix_case(word);
      }
    }

    // check that we have more than 1 word in our string
    if ((end - start) > 1) {
      // concat the last name
      for (j = i; j < end; j++) {
        lastName += " " + fix_case(nameParts[j]);
      }
    }

    // return the various parts in an array
    return {
      "salutation": salutation || "",
      "firstName": firstName.trim(),
      "initials": initials.trim(),
      "lastName": lastName.trim(),
      "suffix": suffix || ""
    };
  };

  const removeIgnoredChars = (word: string) => {
    //ignore periods
    return word.replace(".", "");
  };

  // detect and format standard salutations 
  // I'm only considering english honorifics for now & not words like 
  const is_salutation = (word: string) => {
    word = removeIgnoredChars(word).toLowerCase();
    // returns normalized values
    if (word === "mr" || word === "master" || word === "mister") {
      return "Mr.";
    } else if (word === "mrs") {
      return "Mrs.";
    } else if (word === "miss" || word === "ms") {
      return "Ms.";
    } else if (word === "dr") {
      return "Dr.";
    } else if (word === "rev") {
      return "Rev.";
    } else if (word === "fr") {
      return "Fr.";
    } else {
      return false;
    }
  };

  //  detect and format common suffixes 
  const is_suffix = (word: string) => {
    word = removeIgnoredChars(word).toLowerCase();
    // these are some common suffixes - what am I missing?
    const suffixArray = [
      'I', 'II', 'III', 'IV', 'V', 'Senior', 'Junior', 'Jr', 'Sr', 'PhD', 'APR', 'RPh', 'PE', 'MD', 'MA', 'DMD', 'CME',
      "BVM", "CFRE", "CLU", "CPA", "CSC", "CSJ", "DC", "DD", "DDS", "DO", "DVM", "EdD", "Esq",
      "JD", "LLD", "OD", "OSB", "PC", "Ret", "RGS", "RN", "RNC", "SHCJ", "SJ", "SNJM", "SSMO",
      "USA", "USAF", "USAFR", "USAR", "USCG", "USMC", "USMCR", "USN", "USNR"
    ];

    const suffixIndex = suffixArray.map((suffix: string) => {
      return suffix.toLowerCase();
    }).indexOf(word);

    if (suffixIndex >= 0) {
      return suffixArray[suffixIndex];
    } else {
      return false;
    }
  };

  // detect compound last names like "Von Fange"
  const is_compound_lastName = (word: string) => {
    word = word.toLowerCase();
    // these are some common prefixes that identify a compound last names - what am I missing?
    const words = ['vere', 'von', 'van', 'de', 'del', 'della', 'di', 'da', 'pietro', 'vanden', 'du', 'st.', 'st', 'la', 'lo', 'ter', 'mac', 'mc'];
    return (words.indexOf(word) >= 0);
  };

  // single letter, possibly followed by a period
  const is_initial = (word: string) => {
    word = removeIgnoredChars(word);
    return (word.length === 1);
  };

  // detect mixed case words like "McDonald"
  // returns false if the string is all one case
  const is_camel_case = (word: string) => {
    const ucReg = /[A-Z]+/;
    const lcReg = /[a-z]+/;
    return (ucReg.exec(word) && lcReg.exec(word));
  };

  // ucfirst words split by dashes or periods
  // ucfirst all upper/lower strings, but leave camelcase words alone
  const fix_case = (word: string) => {
    // uppercase words split by dashes, like "Kimura-Fay"
    word = safe_ucfirst("-", word);
    // uppercase words split by periods, like "J.P."
    word = safe_ucfirst(".", word);
    return word;
  };

  // helper for this.fix_case
  // uppercase words split by the seperator (ex. dashes or periods)
  const safe_ucfirst = (seperator: string, word: string) => {
    return word
      .split(seperator)
      .map((thisWord: string) => {
        if (is_camel_case(thisWord)) {
          return thisWord;
        } else {
          return thisWord.substring(0, 1).toUpperCase()
            + thisWord.substring(1).toLowerCase();
        }
      })
      .join(seperator);
  };

  const setupQuoteForm = () => {
    const quoteForm: HTMLElement | null = document.getElementById('quote-form');
    if (!quoteForm) {
      return;
    }

    quoteForm.addEventListener('submit', (ev: SubmitEvent) => {
      let validated = true;

      let fun: HTMLInputElement | null = quoteForm.querySelector('#full_name');
      let fn: HTMLInputElement | null = quoteForm.querySelector('#first_name');
      let ln: HTMLInputElement | null = quoteForm.querySelector('#last_name');

      if (!fun || !fn || !ln) {
        return;
      }

      let parsed = parse(fun.value);

      console.log(parsed)

      fn.value = parsed.firstName;
      ln.value = parsed.lastName;


      document.querySelectorAll('.error-msg').forEach((msg) => {
        msg.innerHTML = '';
      });

      const requiredInputs = document.querySelectorAll('.required-input');
      [].forEach.call(requiredInputs, (item: HTMLInputElement) => {
        if (item.value == '') {
          validated = false;

          const label = item.parentNode?.querySelector('label');
          if (!label) {
            return;
          }

          const errorMsg = item.parentNode?.querySelector('.error-msg');
          if (!errorMsg) {
            return;
          }

          let fieldName = label.innerHTML;
          errorMsg.innerHTML = fieldName + ' field cannot be empty.';
        }
      });




      if (!validated) {
        ev.preventDefault();
        return false;
      }
    });
  }

  setupQuoteForm();
})();