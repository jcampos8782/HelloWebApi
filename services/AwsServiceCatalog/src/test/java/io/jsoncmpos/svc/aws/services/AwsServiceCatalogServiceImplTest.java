package io.jsoncmpos.svc.aws.services;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.jsoncmpos.svc.aws.models.dao.AwsServiceCatalogItem;
import io.jsoncmpos.svc.aws.repositories.AwsServiceCatalogRepository;

public class AwsServiceCatalogServiceImplTest {

	private AwsServiceCatalogServiceImpl service;
	private AwsServiceCatalogRepository repository;
	
	@BeforeEach
	public void beforeEach() {
		repository = mock(AwsServiceCatalogRepository.class);
		service = new AwsServiceCatalogServiceImpl(repository);
	}
	
	@Test 
	public void testGetAllLoadsAllItemsFromRepository() {
		service.getAll();
		verify(repository, times(1)).all();
	}
	
	@Test
	public void testGetAllSortsItemsByName() {
		String[] names = { "ab", "ca", "aa", "cb" };
		List<AwsServiceCatalogItem> items = new ArrayList<>();
		for(int i = 0; i < names.length; i++) {
			var item = new AwsServiceCatalogItem();
			item.setName(names[i]);
			items.add(item);
		}
		
		when(repository.all()).thenReturn(items);
		
		// Sort the array and then map the results to just their names and 
		// assert that the arrays are equal
		Arrays.sort(names);
		
		var results = service.getAll().stream().map(i -> i.getName()).collect(Collectors.toList());
		for(int i = 0; i < names.length; i++) {
			assertEquals(names[i], results.get(i));
		}
		
		
	}
}
