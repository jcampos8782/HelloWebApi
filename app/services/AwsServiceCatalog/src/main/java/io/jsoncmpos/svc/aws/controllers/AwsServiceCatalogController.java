package io.jsoncmpos.svc.aws.controllers;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.jsoncmpos.svc.aws.models.dao.AwsServiceCatalogItem;
import io.jsoncmpos.svc.aws.services.AwsServiceCatalogSearchService;
import io.jsoncmpos.svc.aws.services.AwsServiceCatalogService;

@RestController
@RequestMapping(path = "/api/aws/services")
public class AwsServiceCatalogController {
	
	private AwsServiceCatalogService catalogSvc;
	private AwsServiceCatalogSearchService catalogSearchSvc;
	
	@Autowired
	public AwsServiceCatalogController(AwsServiceCatalogSearchService catalogSearchSvc, AwsServiceCatalogService catalogSvc) {
		this.catalogSearchSvc = catalogSearchSvc;
		this.catalogSvc = catalogSvc;
	}

	@CrossOrigin
	@GetMapping
	public Collection<AwsServiceCatalogItem> getCatalogItems() {
		return catalogSvc.getAll(); 
	}

	@CrossOrigin
	@GetMapping("/groups")
	public Collection<String> getGroups() {
		return catalogSvc.getGroups();
	}

	@CrossOrigin
	@GetMapping("/groups/{groupName}")
	public Collection<AwsServiceCatalogItem> getCatalogItemsByGroup(@PathVariable("groupName") String group) {
		return catalogSearchSvc.findCatalogItemsByGroup(group);
	}

	@CrossOrigin
	@GetMapping("/{serviceName}")
	public AwsServiceCatalogItem getCatalogItemByName(@PathVariable("serviceName") String service) {
		AwsServiceCatalogItem item = catalogSearchSvc.findCatalogItemByName(service);
		if (item == null) {
			item = catalogSearchSvc.findCatalogItemByAcronym(service);
		}
		
		return item;
	}
	
	@CrossOrigin
	@GetMapping("/search")
	public Collection<AwsServiceCatalogItem> getCatalogItems(@RequestParam("q") String query) {
		return catalogSearchSvc.findCatalogItems(query);
	}
}
