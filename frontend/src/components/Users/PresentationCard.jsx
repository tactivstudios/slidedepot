import React, { Component } from "react";

export default class PresentationCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="grid grid-cols-4 gap-11 max-w-sm rounded overflow-hidden shadow-lg">
        <img
          className="w-full"
          src={this.props.item.thumbnail_image}
          alt="Presentation"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">
            {this.props.item.title}
          </div>
          <p className="text-gray-700 text-base">sample name sample name</p>
        </div>
      </div>
    );
  }
}
