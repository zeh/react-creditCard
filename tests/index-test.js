import React from 'react';
import CreditCard from 'src';
import {shallow, render} from 'enzyme';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';

chai.use(chaiEnzyme());

var expect = chai.expect;

describe('<CreditCard />', () => {
  let wrapper;
  let currentTarget;
  let onChange;

  beforeEach(() => {
    onChange = sinon.spy();
    wrapper = shallow(<CreditCard onChange={onChange}/>);
    currentTarget = Object.assign({}, wrapper, {value: '378282246310005'});
  });

  it('should have rendered', () => {
    expect(wrapper.find('input')).to.have.length(1);
  });

  it('should format number on autofill (amex)', () => {
    wrapper.simulate('input', { currentTarget: currentTarget});
    expect(wrapper.state("value")).to.equal('3782 822463 10005');
    expect(wrapper.html()).to.contain('amex');
  });

  it('should format number on autofill (visa)', () => {
    currentTarget.value = '4242424242424242';
    wrapper.simulate('input', { currentTarget: currentTarget});
    expect(wrapper.state("value")).to.equal('4242 4242 4242 4242');
    expect(wrapper.html()).to.contain('visa');
  });

  it('should format number on autofill (mc)', () => {
    currentTarget.value = '5555555555554444';
    wrapper.simulate('input', { currentTarget: currentTarget});
    expect(wrapper.state("value")).to.equal('5555 5555 5555 4444');
    expect(wrapper.html()).to.contain('mastercard');
  });

  it('should execute onChange event', () => {
    wrapper.simulate('input', { currentTarget: currentTarget});

    expect(onChange.calledOnce).to.equal(true);
  });

  it('should execute onChange event with proper value', () => {
    wrapper.simulate('input', { currentTarget: currentTarget});

    expect(onChange.withArgs('3782 822463 10005').calledOnce).to.equal(true);
  });
});

describe('Passig props in', () => {
  it('should add classNames', () => {
    let wrapper = shallow(<CreditCard className="TEST_CLASS_NAME"/>);

    expect(wrapper.html()).to.contain("TEST_CLASS_NAME")
  });

  it('should add classNames', () => {
    let wrapper = render(<CreditCard placeholder="TEST_PLACEHOLDER"/>);

    console.log(wrapper.html());
    expect(wrapper.find("input").attr('placeholder')).to.equal("TEST_PLACEHOLDER")
  })
});

