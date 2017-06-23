import React from 'react'
import PropTypes from 'prop-types'

export default class DatePicker extends React.Component {
  static propTypes = {
    allowSameDay: PropTypes.bool
  }

  static get defaultProps () {
    return {
      allowSameDay: false,
      dateFormat: 'L'
    }
  }

  constructor (props) {
    super(props)
    this.state = this.dateCounterInitialState()
  }

  componentWillUnmount () {
    // this.clearPreventFocusTimeout()
  }

  dateCounterInitialState = () => {
    return {}
  }
	

  onInputKeyDown = (event) => {
    if (!this.state.open && !this.props.inline) {
      this.onInputClick()
      return
    }
    const copy = moment(this.state.preSelection)
    if (event.key === 'Enter') {
      event.preventDefault()
      this.handleSelect(copy, event)
    } else if (event.key === 'Escape') {
      event.preventDefault()
      this.setOpen(false)
    } else if (event.key === 'Tab') {
      this.setOpen(false)
    }
    if (!this.props.disabledKeyboardNavigation) {
      let newSelection
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault()
          newSelection = copy.subtract(1, 'days')
          break
        case 'ArrowRight':
          event.preventDefault()
          newSelection = copy.add(1, 'days')
          break
        case 'ArrowUp':
          event.preventDefault()
          newSelection = copy.subtract(1, 'weeks')
          break
        case 'ArrowDown':
          event.preventDefault()
          newSelection = copy.add(1, 'weeks')
          break
        case 'PageUp':
          event.preventDefault()
          newSelection = copy.subtract(1, 'months')
          break
        case 'PageDown':
          event.preventDefault()
          newSelection = copy.add(1, 'months')
          break
        case 'Home':
          event.preventDefault()
          newSelection = copy.subtract(1, 'years')
          break
        case 'End':
          event.preventDefault()
          newSelection = copy.add(1, 'years')
          break
      }
      this.setPreSelection(newSelection)
    }
  }

  onClearClick = (event) => {
    event.preventDefault()
    this.props.onChange(null, event)
  }

  renderCalendar = () => {
    if (!this.props.inline && (!this.state.open || this.props.disabled)) {
      return null
    }
    return <WrappedCalendar
        ref="calendar"
        locale={this.props.locale}
        dateFormat={this.props.dateFormatCalendar}
        dropdownMode={this.props.dropdownMode}
        selected={this.props.selected}
        preSelection={this.state.preSelection}
        onSelect={this.handleSelect}
        openToDate={this.props.openToDate}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        selectsStart={this.props.selectsStart}
        selectsEnd={this.props.selectsEnd}
        startDate={this.props.startDate}
        endDate={this.props.endDate}
        excludeDates={this.props.excludeDates}
        filterDate={this.props.filterDate}
        onClickOutside={this.handleCalendarClickOutside}
        highlightDates={this.props.highlightDates}
        includeDates={this.props.includeDates}
        inline={this.props.inline}
        peekNextMonth={this.props.peekNextMonth}
        showMonthDropdown={this.props.showMonthDropdown}
        showWeekNumbers={this.props.showWeekNumbers}
        showYearDropdown={this.props.showYearDropdown}
        forceShowMonthNavigation={this.props.forceShowMonthNavigation}
        scrollableYearDropdown={this.props.scrollableYearDropdown}
        todayButton={this.props.todayButton}
        utcOffset={this.props.utcOffset}
        outsideClickIgnoreClass={outsideClickIgnoreClass}
        fixedHeight={this.props.fixedHeight}
        monthsShown={this.props.monthsShown}
        onDropdownFocus={this.handleDropdownFocus}
        onMonthChange={this.props.onMonthChange}
        className={this.props.calendarClassName}>
      {this.props.children}
    </WrappedCalendar>
  }

  renderDateInput = () => {
    var className = classnames(this.props.className, {
      [outsideClickIgnoreClass]: this.state.open
    })

    const customInput = this.props.customInput || <input type="text" />
    const inputValue =
      typeof this.props.value === 'string' ? this.props.value
        : typeof this.state.inputValue === 'string' ? this.state.inputValue
        : safeDateFormat(this.props.selected, this.props)

    return React.cloneElement(customInput, {
      ref: 'input',
      value: inputValue,
      onBlur: this.handleBlur,
      onChange: this.handleChange,
      onClick: this.onInputClick,
      onFocus: this.handleFocus,
      onKeyDown: this.onInputKeyDown,
      id: this.props.id,
      name: this.props.name,
      autoFocus: this.props.autoFocus,
      placeholder: this.props.placeholderText,
      disabled: this.props.disabled,
      autoComplete: this.props.autoComplete,
      className: className,
      title: this.props.title,
      readOnly: this.props.readOnly,
      required: this.props.required,
      tabIndex: this.props.tabIndex
    })
  }

  render () {
    return (
      <TetherComponent
          classPrefix={'react-datepicker__tether'}
          attachment={this.props.popoverAttachment}
          targetAttachment={this.props.popoverTargetAttachment}
          targetOffset={this.props.popoverTargetOffset}
          renderElementTo={this.props.renderCalendarTo}
          constraints={this.props.tetherConstraints}>
      </TetherComponent>
    )
  }
}
