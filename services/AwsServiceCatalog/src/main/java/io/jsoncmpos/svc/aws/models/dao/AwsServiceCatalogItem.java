package io.jsoncmpos.svc.aws.models.dao;

import com.google.gson.Gson;

public class AwsServiceCatalogItem {

	private String name;
	private String group;
	private String acronym;
	private String description;
	private String url;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getGroup() {
		return group;
	}
	public void setGroup(String group) {
		this.group = group;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getAcronym() {
		return acronym;
	}
	public void setAcronym(String acronym) {
		this.acronym = acronym;
	}
	
	@Override
	public String toString() {
		return new Gson().toJson(this).toString();
	}
}
