# `React CreditCard.`

This is a port of the [Stripe jquery.payment plugin](https://github.com/stripe/jquery.payment).  It allows you to use 
pure react on the site.  Right now this is pretty much a CoffeeScript to JS transpile to a React component.  

Next iteration is to clean it up, add tests and possibly some validation.

  
```
import CreditCard from 'react-creditCard';


.
.
.


render() {
    return (<CreditCard id="ccnumber" name="ccnumber" autoComplete="cc-number" size="20"/>)
}
```

More to come...