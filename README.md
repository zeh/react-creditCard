# `React CreditCard.`

This is a port of the [Stripe jquery.payment plugin](https://github.com/stripe/jquery.payment).  It allows you to use 
pure react on the site.  Right now this is pretty much a CoffeeScript to JS transpile to a React component.  

Next iteration is to clean it up, add tests and possibly some lun validation.  We currently use StripeJS for that kind 
 validation because it will do more verifications for us.
 
# Installation

```
npm install react-creditCard --save
```

#Example
  
```
import CreditCard from 'react-creditCard';


.
.
.

onChange(value) {
    this.setState({ccValue: value});
}


render() {
    return (<CreditCard id="ccnumber" name="ccnumber" autoComplete="cc-number" size="20" onChange={::this.onChange}/>)
}
```

More to come...

- Validation
- What is needed?