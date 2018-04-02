// never used
class RefreshIcon extends React.Component {
    render() {
      return (
        <TouchableOpacity onPress={this.props.onPress}>
          <Icon name="ios-refresh" size={36} color={linkColor} style={{ marginRight: 8, marginTop: 8 }} />
        </TouchableOpacity>
      );
    }
  }